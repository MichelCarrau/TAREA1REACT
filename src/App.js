import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import Library from './components/Library/Library';
import SongDetail from './components/SongDetail/SongDetail';
import useFetch from './hooks/UseFetch';

const AppContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTrigger, setSearchTrigger] = useState('');

 const apiUrl = searchTrigger 
  ? `/api/v1/json/2/searchalbum.php?s=${searchTrigger}`
  : '';

  const { data, loading, error } = useFetch(apiUrl);

  const handleSearch = (artist) => {
    setSearchTrigger(artist);
    setSearchTerm(artist);
  };

  const handleRetry = () => {
    if (searchTrigger) {
      handleSearch(searchTrigger);
    }
  };

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

  return (
    <div>
      <Header />
      
      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <SearchBar onSearch={handleSearch} />
              <AppContainer>
                <SearchResults 
                  results={songs}
                  loading={loading}
                  error={error}
                  onRetry={handleRetry}
                />
                <Library />
              </AppContainer>
            </>
          } 
        />
        <Route path="/song/:id" element={<SongDetail />} />
      </Routes>
    </div>
  );
};

export default App;