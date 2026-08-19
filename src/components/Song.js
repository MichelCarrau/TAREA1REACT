import React, { Component } from 'react';

class Song extends Component {
  render() {
    const { number, title, artist, duration, album, genre } = this.props;
    
    const emojis = ['🎵', '🎶', '🎸', '🎹', '🥁', '🎺', '🎷', '🎧'];
    const randomEmoji = emojis[number % emojis.length];
    
    return (
      <div className="song-card">
        <span className="song-number">#{String(number).padStart(2, '0')}</span>
        <div className="song-info">
          <div className="song-icon">
            {randomEmoji}
          </div>
          <div className="song-details">
            <div className="song-title">
              {title}
              {genre && <span className="song-badge">{genre}</span>}
            </div>
            <div className="song-artist">{artist}</div>
            <div className="song-album">{album}</div>
          </div>
        </div>
        <div className="song-right">
          <span className="song-duration">⏱️ {duration}</span>
          <div className="song-actions">
            <button title="Agregar a favoritos">❤️</button>
            <button title="Más opciones">⋯</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Song;