import React from 'react';
import Song from '../Song/Song';
import './Library.css';

const Library = ({ songs }) => {
  return (
    <div className="library">
      <div className="section-header">
        <h2>📚 Mi Biblioteca</h2>
        <span className="count">{songs.length} canciones</span>
      </div>
      {songs.length === 0 ? (
        <div className="empty-library">
          <p>🎶 No tienes canciones guardadas</p>
          <p className="sub-text">Busca y agrega tus canciones favoritas</p>
        </div>
      ) : (
        <div className="songs-list">
          {songs.map((song, index) => (
            <Song
              key={`library-${index}`}
              title={song.title}
              artist={song.artist}
              album={song.album}
              duration={song.duration}
              isInLibrary={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Library;