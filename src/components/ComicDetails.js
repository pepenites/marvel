import React, { useState, useEffect } from 'react';

const ComicDetails = ({ comicId, goBack }) => {
  const [comic, setComic] = useState(null);
  const [error, setError] = useState(null);

  const publicKey = 'fbafb2f04b00ecc3409623ca24807135';
  const privateKey = '23ad6e6fdea4046aea5aaed841f224e6de498098';

  // Función para generar el hash MD5
  const generateHash = async (input) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest('MD5', data);
    return Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  };

  useEffect(() => {
    const fetchComicDetails = async () => {
      const ts = Date.now();
      const hash = await generateHash(ts + privateKey + publicKey);

      const url = `https://gateway.marvel.com/v1/public/comics/${comicId}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (data && data.data && data.data.results && data.data.results[0]) {
          setComic(data.data.results[0]);
        } else {
          throw new Error('Estructura de respuesta inesperada');
        }
      } catch (error) {
        console.error('Error al obtener los detalles del cómic:', error.message);
        setError(error.message);
      }
    };

    fetchComicDetails();
  }, [comicId]);

  if (error) {
    return (
      <div>
        <button onClick={goBack}>Volver</button>
        <p>Error al cargar los detalles del cómic: {error}</p>
      </div>
    );
  }

  if (!comic) {
    return (
      <div>
        <button onClick={goBack}>Volver</button>
        <p>Cargando detalles del cómic...</p>
      </div>
    );
  }

  return (
    <div>
      <button onClick={goBack}>Volver</button>
      <h2>{comic.title}</h2>
      <img
        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
        alt={comic.title}
      />
      <p>{comic.description || 'Descripción no disponible.'}</p>
      <h3>Personajes:</h3>
      <ul>
        {comic.characters.items.length > 0 ? (
          comic.characters.items.map((character) => (
            <li key={character.resourceURI}>{character.name}</li>
          ))
        ) : (
          <p>No hay personajes disponibles.</p>
        )}
      </ul>
      <h3>Creadores:</h3>
      <ul>
        {comic.creators.items.length > 0 ? (
          comic.creators.items.map((creator) => (
            <li key={creator.resourceURI}>
              {creator.name} - {creator.role}
            </li>
          ))
        ) : (
          <p>No hay información sobre los creadores.</p>
        )}
      </ul>
    </div>
  );
};

export default ComicDetails;
