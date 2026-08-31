import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { addSong } from '../../redux/slices/librarySlice';
import { fetchSongs } from '../../redux/slices/searchSlice';
import Song from '../Song/Song';

const ResultsContainer = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.large};
  padding: 25px;
  margin-bottom: 30px;
  box-shadow: ${props => props.theme.shadows.medium};
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 15px;
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.colors.black};
  font-size: 1.5em;
`;

const Count = styled.span`
  background: #f5f3ff;
  color: ${props => props.theme.colors.primary};
  padding: 4px 14px;
  border-radius: 15px;
  font-weight: 500;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: ${props => props.theme.colors.gray};
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid #f0f0f0;
  border-top: 4px solid ${props => props.theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 15px;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 30px 20px;
  color: ${props => props.theme.colors.error};
`;

const ErrorHint = styled.p`
  font-size: 0.9em;
  color: #666;
  margin-top: 5px;
`;

const RetryButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border: none;
  padding: 10px 25px;
  border-radius: ${props => props.theme.borderRadius.small};
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  margin-top: 15px;

  &:hover {
    background: ${props => props.theme.colors.primaryLight};
    transform: scale(1.05);
  }
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #999;
  font-size: 1.1em;
`;

const SearchResults = () => {
  const dispatch = useDispatch();
  const { results, loading, error } = useSelector((state) => state.search);
  const library = useSelector((state) => state.library);

  const handleAddSong = (song) => {
    const songWithId = {
      ...song,
      id: song.id || `song-${Date.now()}`
    };
    dispatch(addSong(songWithId));
  };

  const handleRetry = () => {
    const lastSearch = localStorage.getItem('lastSearch') || '';
    if (lastSearch) {
      dispatch(fetchSongs(lastSearch));
    }
  };

  if (loading) {
    return (
      <ResultsContainer>
        <SectionHeader>
          <SectionTitle>🔍 Resultados de búsqueda</SectionTitle>
        </SectionHeader>
        <LoadingMessage>
          <Spinner />
          <p>Cargando canciones...</p>
        </LoadingMessage>
      </ResultsContainer>
    );
  }

  if (error) {
    return (
      <ResultsContainer>
        <SectionHeader>
          <SectionTitle>🔍 Resultados de búsqueda</SectionTitle>
        </SectionHeader>
        <ErrorMessage>
          <p>⚠️ {error}</p>
          <ErrorHint>
            💡 Recuerda: busca por nombre de artista (ej: Coldplay, Oasis, Queen)
          </ErrorHint>
          <RetryButton onClick={handleRetry}>🔄 Reintentar</RetryButton>
        </ErrorMessage>
      </ResultsContainer>
    );
  }

  if (!results || results.length === 0) {
    return (
      <ResultsContainer>
        <SectionHeader>
          <SectionTitle>🔍 Resultados de búsqueda</SectionTitle>
        </SectionHeader>
        <EmptyMessage>🎶 Busca un artista para ver sus canciones</EmptyMessage>
      </ResultsContainer>
    );
  }

  return (
    <ResultsContainer>
      <SectionHeader>
        <SectionTitle>🔍 Resultados de búsqueda</SectionTitle>
        <Count>{results.length} canciones</Count>
      </SectionHeader>
      <div>
        {results.map((song, index) => (
          <Song
            key={song.id || `result-${index}`}
            id={song.id || `song-${index}`}
            title={song.title || 'Sin título'}
            artist={song.artist || 'Artista desconocido'}
            album={song.album || 'Álbum desconocido'}
            duration={song.duration || 'N/A'}
            onAdd={() => handleAddSong(song)}
            isInLibrary={library.some(libSong => libSong.id === song.id)}
            showLink={true}
          />
        ))}
      </div>
    </ResultsContainer>
  );
};

export default SearchResults;