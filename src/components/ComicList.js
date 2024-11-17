import React, { useState, useEffect } from 'react';
import md5 from 'crypto-js/md5';

const ComicList = ({ onComicSelect, isFavoritesView, favorites }) => {
  const [comics, setComics] = useState([]);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const publicKey = 'fbafb2f04b00ecc3409623ca24807135';
  const privateKey = '23ad6e6fdea4046aea5aaed841f224e6de498098';

  useEffect(() => {
    if (isFavoritesView) {
      const uniqueFavorites = favorites.filter(
        (comic, index, self) => self.findIndex((c) => c.id === comic.id) === index
      );
      setComics(uniqueFavorites);
      return;
    }

    const fetchComics = async () => {
      setLoading(true);
      const ts = Date.now();
      const hash = md5(ts + privateKey + publicKey).toString();

      const limit = offset === 0 ? 12 : 20; // Mostrar 12 cómics en la preview inicial
      const url = `https://gateway.marvel.com/v1/public/comics?orderBy=modified&limit=${limit}&offset=${offset}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (data && data.data && data.data.results) {
          const uniqueComics = [
            ...comics,
            ...data.data.results.filter(
              (comic) => !comics.some((existingComic) => existingComic.id === comic.id)
            ),
          ];
          setComics(uniqueComics);
        } else {
          throw new Error('Estructura de respuesta inesperada');
        }
      } catch (error) {
        console.error('Error al obtener los cómics:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComics();
  }, [offset, isFavoritesView, favorites]);

  const loadMoreComics = () => {
    if (!isFavoritesView && !loading) {
      setOffset((prevOffset) => prevOffset + 20);
    }
  };

  if (error) {
    return <p>Error al cargar los cómics: {error}</p>;
  }

  return (
    <div>
      <h1>{isFavoritesView ? 'Favoritos' : 'Últimos Cómics Modificados'}</h1>
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
              className="comic-thumbnail"
            />
            <p>{comic.title}</p>
          </div>
        ))}
      </div>
      {!isFavoritesView && (
        <button
          onClick={loadMoreComics}
          className="cargar-mas"
          disabled={loading}
        >
          {loading ? 'Cargando...' : 'Cargar más'}
        </button>
      )}
    </div>
  );
};

export default ComicList;
