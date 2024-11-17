import React from 'react';

const ComicDetailsPopup = ({ comic, onClose, onAddToFavorites }) => {
  if (!comic) return null;

  return (
    <div className="popup">
      <div className="popup-content">
        <button onClick={onClose} className="close-button">X</button>
        <h2>{comic.title}</h2>
        <img
          src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
          alt={comic.title}
        />
        <p>{comic.description || 'Descripción no disponible.'}</p>
        <button onClick={() => onAddToFavorites(comic)}>Añadir a Favoritos</button>
      </div>
    </div>
  );
};

export default ComicDetailsPopup;
