import React from 'react';

const ComicDetailsPopup = ({ comic, onClose, toggleFavorite, isFavorite }) => {
  if (!comic) return null;

  return (
    <div className="popup">
      <div className="popup-content">
        <button onClick={onClose} className="close-button">X</button>
        <div className="popup-body">
          <div className="popup-image">
            <img
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt={comic.title}
            />
          </div>
          <div className="popup-info">
            <h2>{comic.title}</h2>
            <p>{comic.description || 'Descripción no disponible.'}</p>
            <p><strong>Páginas:</strong> {comic.pageCount || 'N/A'}</p>
            <p>
              <strong>Fecha de Publicación:</strong>{' '}
              {comic.dates?.find((d) => d.type === 'onsaleDate')?.date || 'No disponible'}
            </p>
            <p><strong>Precio:</strong> ${comic.prices?.[0]?.price || 'N/A'}</p>
            <button
              onClick={() => toggleFavorite(comic)}
              className={`favorite-button ${isFavorite ? 'remove' : 'add'}`}
            >
              {isFavorite ? 'Quitar de Favoritos' : 'Añadir a Favoritos'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComicDetailsPopup;
