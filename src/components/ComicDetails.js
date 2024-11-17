import React from 'react';

const ComicDetails = ({ comic, goBack }) => {
  if (!comic) return <p>No se ha seleccionado ningún cómic.</p>;

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
        {comic.characters.items.map((character) => (
          <li key={character.resourceURI}>{character.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ComicDetails;
