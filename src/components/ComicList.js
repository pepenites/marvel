import React, { useState, useEffect } from 'react';
import md5 from 'crypto-js/md5';

const ComicList = ({ onComicSelect }) => {
  const [comics, setComics] = useState([]);
  const [error, setError] = useState(null);

  const publicKey = 'fbafb2f04b00ecc3409623ca24807135';
  const privateKey = '23ad6e6fdea4046aea5aaed841f224e6de498098';

  useEffect(() => {
    const fetchComics = async () => {
      const ts = Date.now();
      const hash = md5(ts + privateKey + publicKey).toString();

      const url = `https://gateway.marvel.com/v1/public/comics?orderBy=modified&limit=10&ts=${ts}&apikey=${publicKey}&hash=${hash}`;

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (data && data.data && data.data.results) {
          setComics(data.data.results);
        } else {
          throw new Error('Estructura de respuesta inesperada');
        }
      } catch (error) {
        console.error('Error al obtener los cómics:', error.message);
        setError(error.message);
      }
    };

    fetchComics();
  }, []);

  if (error) {
    return <p>Error al cargar los cómics: {error}</p>;
  }

  return (
    <div>
      <h1>Últimos Cómics Modificados</h1>
      <div className="comic-list">
        {comics.map((comic) => (
          <div
            key={comic.id}
            onClick={() => onComicSelect(comic)}
            className="comic-card"
          >
            <img
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt={comic.title}
            />
            <p>{comic.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComicList;
