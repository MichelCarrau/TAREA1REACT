import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import Library from './components/Library/Library';
import SongDetail from './components/SongDetail/SongDetail';
import useFetch from './hooks/UseFetch';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [library, setLibrary] = useState([]);
  const [searchTrigger, setSearchTrigger] = useState('');

  // URL de la API basada en el término de búsqueda
  const apiUrl = searchTrigger 
  ? `https://corsproxy.io/?url=https://theaudiodb.com/api/v1/json/2/searchalbum.php?s=${searchTrigger}`
  : '';

  const { data, loading, error } = useFetch(apiUrl);

  // Función para manejar la búsqueda
  const handleSearch = (artist) => {
    setSearchTrigger(artist);
    setSearchTerm(artist);
  };

  // Función para reintentar
  const handleRetry = () => {
    if (searchTrigger) {
      handleSearch(searchTrigger);
    }
  };

  // Procesar datos de la API para transformarlos en canciones
  const processSongs = () => {
    if (!data || !data.album) return [];
    
    return data.album.map((album, index) => ({
      id: album.idAlbum || `album-${index}`,
      title: album.strAlbum || 'Álbum sin título',
      artist: album.strArtist || searchTerm || 'Artista desconocido',
      album: album.strAlbum || 'Álbum desconocido',
      duration: null,
      strTrack: album.strAlbum,
      strArtist: album.strArtist,
      strAlbum: album.strAlbum,
      idAlbum: album.idAlbum
    }));
  };

  const songs = processSongs();

  // useEffect para la biblioteca
  useEffect(() => {
    console.log(`📚 Biblioteca actualizada: ${library.length} canciones`);
    if (library.length > 0) {
      console.log('🎵 Canciones en biblioteca:', library.map(s => s.title).join(', '));
    }
  }, [library]);

  // Función para agregar canciones a la biblioteca
  const addToLibrary = (song) => {
    if (!library.some(libSong => libSong.title === song.title)) {
      setLibrary([...library, song]);
      console.log(`✅ Agregada: "${song.title}" - ${song.artist}`);
    } else {
      console.log(`⚠️ "${song.title}" ya está en tu biblioteca`);
    }
  };

  return (
    <div className="App">
      <Header />
      
      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <SearchBar onSearch={handleSearch} />
              <div className="app-content">
                <SearchResults 
                  results={songs}
                  onAddSong={addToLibrary}
                  library={library}
                  loading={loading}
                  error={error}
                  onRetry={handleRetry}
                />
                <Library songs={library} />
              </div>
            </>
          } 
        />
        <Route path="/song/:id" element={<SongDetail />} />
      </Routes>
    </div>
  );
};

export default App;