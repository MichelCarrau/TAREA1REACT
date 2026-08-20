import React from 'react';
import Song from '../Song/Song';
import './SearchResults.css';

const SearchResults = ({ results, onAddSong, library }) => {
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
            title={song.title}
            artist={song.artist}
            album={song.album}
            duration={song.duration}
            onAdd={onAddSong}
            isInLibrary={library.some(libSong => libSong.title === song.title)}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;