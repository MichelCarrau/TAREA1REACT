import React from 'react';
import './Song.css';

const Song = ({ title, artist, duration, album, onAdd, isInLibrary }) => {
  return (
    <div className="song-card">
      <div className="song-info">
        <div className="song-icon">🎵</div>
        <div className="song-details">
          <h3 className="song-title">{title}</h3>
          <p className="song-artist">{artist}</p>
          <p className="song-album">💿 {album}</p>
        </div>
      </div>
      <div className="song-right">
        <span className="song-duration">⏱️ {duration}</span>
        {onAdd && !isInLibrary && (
          <button 
            className="btn-add" 
            onClick={() => onAdd({ title, artist, duration, album })}
          >
            ➕ Agregar
          </button>
        )}
        {isInLibrary && (
          <span className="badge-added">✅ En biblioteca</span>
        )}
      </div>
    </div>
  );
};

export default Song;