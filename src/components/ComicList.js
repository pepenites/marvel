import React, { useState, useEffect } from 'react';

const ComicList = ({ selectComic }) => {
  const [comics, setComics] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComics = async () => {
      // URL con tu clave pública
      const url = `https://gateway.marvel.com/v1/public/comics?orderBy=modified&limit=10&apikey=fbafb2f04b00ecc3409623ca24807135`;

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

  return (
    <div>
      <h1>Últimos Cómics Modificados</h1>
      {error ? (
        <p>Error al cargar los cómics: {error}</p>
      ) : comics.length > 0 ? (
        <div className="comic-list">
          {comics.map((comic) => (
            <div
              key={comic.id}
              onClick={() => selectComic(comic)}
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
      ) : (
        <p>Cargando cómics...</p>
      )}
    </div>
  );
};

export default ComicList;
