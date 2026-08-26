import React from 'react';
import { Link } from 'react-router-dom';
import './Song.css';

const Song = ({ 
  title, 
  artist, 
  album, 
  duration, 
  onAdd, 
  isInLibrary,
  id,
  showLink = false 
}) => {
  return (
    <div className="song-card">
      <div className="song-info">
        <div className="song-icon">🎵</div>
        <div className="song-details">
          <h3 className="song-title">
            {showLink ? (
              <Link to={`/song/${id || title}`} className="song-link">
                {title}
              </Link>
            ) : (
              title
            )}
          </h3>
          <p className="song-artist">{artist}</p>
          <p className="song-album">💿 {album || 'Álbum desconocido'}</p>
        </div>
      </div>
      <div className="song-right">
        {duration && <span className="song-duration">⏱️ {duration}</span>}
        {onAdd && !isInLibrary && (
          <button 
            className="btn-add" 
            onClick={() => onAdd({ title, artist, album, duration })}
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