import React, { useState } from 'react';
import ComicList from './components/ComicList';
import ComicDetailsPopup from './components/ComicDetailsPopup';
import Favorites from './components/Favorites';
import './App.css';

const App = () => {
  const [selectedComic, setSelectedComic] = useState(null);

  const addToFavorites = (comic) => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const updatedFavorites = [...savedFavorites, comic];
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    alert(`${comic.title} añadido a favoritos`);
  };

  const closePopup = () => {
    setSelectedComic(null);
  };

  return (
    <div className="app">
      <ComicList onComicSelect={setSelectedComic} />
      <ComicDetailsPopup
        comic={selectedComic}
        onClose={closePopup}
        onAddToFavorites={addToFavorites}
      />
      <Favorites />
    </div>
  );
};

export default App;
