import React, { useState, useEffect } from "react";
import Filme from "../filme/Filme";
import axios from "axios";
import './Main.css';

type FilmesType = {
  id: number;
  titulo: string;
  descricao: string;
  imagem: string;
};

export default function Main() {
  const [filmes, setData] = useState<FilmesType[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [texto, setTexto] = useState("");

  useEffect(() => {
    axios.get('http://localhost:3000/filmes')
      .then(response => {
        if (response.status === 200) {
          setData(response.data);
        }
      })
      .catch(error => {
        console.error("Erro", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTexto(e.target.value);
  };

  if (loading) return "loading...";
  if (error) return "error";

  return (
    <>
      <div className="pesquisa">
        <p>Buscar Filme</p>
        <input className='barrapesquisa' type="text" onChange={handleTextChange} />
        <div>
          <p className='texto_digitado'>pesquisa: {texto}</p>
        </div>
      </div>
      <main className="content-main">
        {filmes &&
          filmes
            .filter((filme) => filme.titulo.toLowerCase().includes(texto.toLowerCase()))
            .map((filme) => (
              <Filme key={filme.id} titulo={filme.titulo} descricao={filme.descricao} imagem={filme.imagem} />
            ))}
      </main>
    </>
  );
}
