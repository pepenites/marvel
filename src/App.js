import React, { useState, useEffect } from 'react';
import ComicList from './components/ComicList';
import ComicDetailsPopup from './components/ComicDetailsPopup';
import './App.css';

const App = () => {
  const [selectedComic, setSelectedComic] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [isFavoritesView, setIsFavoritesView] = useState(false);

  // Cargar favoritos desde localStorage al inicio
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  // Añadir o quitar un cómic de los favoritos
  const toggleFavorite = (comic) => {
    const isFavorite = favorites.some((fav) => fav.id === comic.id);
    let updatedFavorites;

    if (isFavorite) {
      // Quitar de favoritos
      updatedFavorites = favorites.filter((fav) => fav.id !== comic.id);
    } else {
      // Añadir a favoritos
      updatedFavorites = [...favorites, comic];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Actualizar localStorage
  };

  // Alternar entre todos los cómics y los favoritos
  const toggleView = () => {
    setIsFavoritesView(!isFavoritesView);
  };

  // Cerrar el popup
  const closePopup = () => {
    setSelectedComic(null);
  };

  return (
    <div className="app">
      {/* Botón para alternar entre las vistas */}
      <button
        onClick={toggleView}
        className="ver-favoritos"
      >
        {isFavoritesView ? 'Ver Todos los Cómics' : 'Ver Favoritos'}
      </button>

      {/* Lista de cómics (todos o favoritos según la vista) */}
      <ComicList
        onComicSelect={setSelectedComic}
        isFavoritesView={isFavoritesView}
        favorites={favorites}
      />

      {/* Popup con los detalles del cómic seleccionado */}
      <ComicDetailsPopup
        comic={selectedComic}
        onClose={closePopup}
        toggleFavorite={toggleFavorite}
        isFavorite={favorites.some((fav) => fav?.id === selectedComic?.id)}
      />
    </div>
  );
};

export default App;
