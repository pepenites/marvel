import React, { useState, useEffect } from 'react';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div>
      <h2>Favoritos</h2>
      <ul>
        {favorites.map((comic) => (
          <li key={comic.id}>
            <p>{comic.title}</p>
            <button onClick={() => removeFavorite(comic.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
