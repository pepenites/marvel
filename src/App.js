import React, { useState } from 'react';
import ComicList from './components/ComicList';
import ComicDetails from './components/ComicDetails';
import Favorites from './components/Favorites';
import './index.css';

const App = () => {
  const [currentView, setCurrentView] = useState('list');
  const [selectedComic, setSelectedComic] = useState(null);

  const selectComic = (comic) => {
    setSelectedComic(comic);
    setCurrentView('details');
  };

  const goBack = () => {
    setCurrentView('list');
  };

  return (
    <div className="app">
      {currentView === 'list' ? (
        <>
          <ComicList selectComic={selectComic} />
          <Favorites />
        </>
      ) : (
        <ComicDetails comic={selectedComic} goBack={goBack} />
      )}
    </div>
  );
};

export default App;
