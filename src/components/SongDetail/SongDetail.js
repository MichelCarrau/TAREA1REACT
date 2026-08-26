import React from 'react';
import { useParams, Link } from 'react-router-dom';
import useFetch from '../../hooks/UseFetch';
import './SongDetail.css';

const SongDetail = () => {
  const { id } = useParams();
  
  // Buscar detalles del álbum usando el ID
  const { data, loading, error } = useFetch(
    `https://theaudiodb.com/api/v1/json/2/album.php?m=${id}`
  );

  if (loading) {
    return (
      <div className="song-detail-container">
        <div className="loading-message">
          <div className="spinner"></div>
          <p>Cargando detalles de la canción...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="song-detail-container">
        <div className="error-message">
          <p>⚠️ {error}</p>
          <Link to="/" className="back-button">← Volver a buscar</Link>
        </div>
      </div>
    );
  }

  if (!data || !data.album) {
    return (
      <div className="song-detail-container">
        <div className="empty-message">
          <p>🎵 No se encontraron detalles de esta canción</p>
          <Link to="/" className="back-button">← Volver a buscar</Link>
        </div>
      </div>
    );
  }

  const album = data.album[0];

  return (
    <div className="song-detail-container">
      <Link to="/" className="back-button">← Volver a buscar</Link>
      
      <div className="song-detail-card">
        <div className="detail-header">
          <div className="detail-icon">🎵</div>
          <h1>{album.strAlbum || 'Álbum sin título'}</h1>
        </div>
        
        <div className="detail-info">
          <div className="detail-row">
            <span className="detail-label">🎤 Artista:</span>
            <span className="detail-value">{album.strArtist || 'Desconocido'}</span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">💿 Álbum:</span>
            <span className="detail-value">{album.strAlbum || 'Desconocido'}</span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">📅 Año:</span>
            <span className="detail-value">{album.intYearReleased || 'Desconocido'}</span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">🏷️ Género:</span>
            <span className="detail-value">{album.strGenre || 'Desconocido'}</span>
          </div>
          
          {album.strDescriptionEN && (
            <div className="detail-row description">
              <span className="detail-label">📝 Descripción:</span>
              <p className="detail-value description-text">
                {album.strDescriptionEN}
              </p>
            </div>
          )}
        </div>
        
        {album.strAlbumThumb && (
          <img 
            src={album.strAlbumThumb} 
            alt={album.strAlbum} 
            className="album-cover"
          />
        )}
      </div>
    </div>
  );
};

export default SongDetail;