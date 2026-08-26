import React from 'react';
import Song from '../Song/Song';
import './SearchResults.css';

const SearchResults = ({ results, onAddSong, library, loading, error, onRetry }) => {
  // Renderizado condicional: Carga
  if (loading) {
    return (
      <div className="search-results">
        <div className="section-header">
          <h2>🔍 Resultados de búsqueda</h2>
        </div>
        <div className="loading-message">
          <div className="spinner"></div>
          <p>Cargando canciones...</p>
        </div>
      </div>
    );
  }

  // Renderizado condicional: Error
  if (error) {
    return (
      <div className="search-results">
        <div className="section-header">
          <h2>🔍 Resultados de búsqueda</h2>
        </div>
        <div className="error-message">
          <p>⚠️ {error}</p>
          <button onClick={onRetry} className="retry-button">
            🔄 Reintentar
          </button>
        </div>
      </div>
    );
  }

  // Renderizado condicional: Sin resultados
  if (!results || results.length === 0) {
    return (
      <div className="search-results">
        <div className="section-header">
          <h2>🔍 Resultados de búsqueda</h2>
        </div>
        <div className="empty-message">
          <p>🎶 Busca un artista para ver sus canciones</p>
        </div>
      </div>
    );
  }

  return (
    <div className="search-results">
      <div className="section-header">
        <h2>🔍 Resultados de búsqueda</h2>
        <span className="count">{results.length} canciones</span>
      </div>
      <div className="songs-list">
        {results.map((song, index) => (
          <Song
            key={song.id || `result-${index}`}
            id={song.id || `song-${index}`}
            title={song.title || song.strTrack || 'Sin título'}
            artist={song.artist || song.strArtist || 'Artista desconocido'}
            album={song.album || song.strAlbum || 'Álbum desconocido'}
            duration={song.duration || song.intDuration || 'N/A'}
            onAdd={onAddSong}
            isInLibrary={library.some(
              libSong => libSong.title === (song.title || song.strTrack)
            )}
            showLink={true}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;