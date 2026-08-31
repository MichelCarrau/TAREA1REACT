import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import Library from './components/Library/Library';
import SongDetail from './components/SongDetail/SongDetail';

const AppContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <SearchBar />
              <AppContainer>
                <SearchResults />
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