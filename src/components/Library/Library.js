import React from 'react';
import { useSelector, useDispatch } from 'react-redux'; // Importar hooks
import styled from 'styled-components';
import { removeSong } from '../../redux/libraryActions'; // Importar action
import Song from '../Song/Song';

const LibraryContainer = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.large};
  padding: 25px;
  box-shadow: ${props => props.theme.shadows.medium};
  border: 2px solid ${props => props.theme.colors.secondary};
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 2px solid ${props => props.theme.colors.secondary};
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

const EmptyLibrary = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #999;
`;

const EmptyText = styled.p`
  font-size: 1.1em;
  margin-bottom: 5px;
`;

const SubText = styled.p`
  font-size: 0.9em;
  color: #bbb;
`;

// Componente extendido de Song con botón eliminar
const SongWithRemove = styled.div`
  position: relative;
`;

const RemoveButton = styled.button`
  background: #ffebee;
  color: #d32f2f;
  border: none;
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-left: 10px;

  &:hover {
    background: #ffcdd2;
    transform: scale(1.05);
  }
`;

const Library = () => {
  const dispatch = useDispatch();
  
  // Obtener la biblioteca del estado global de Redux
  const library = useSelector(state => state);

  // Función para eliminar canción
  const handleRemoveSong = (songId) => {
    dispatch(removeSong(songId));
  };

  if (library.length === 0) {
    return (
      <LibraryContainer>
        <SectionHeader>
          <SectionTitle>📚 Mi Biblioteca</SectionTitle>
          <Count>0 canciones</Count>
        </SectionHeader>
        <EmptyLibrary>
          <EmptyText>🎶 No tienes canciones guardadas</EmptyText>
          <SubText>Busca y agrega tus canciones favoritas</SubText>
        </EmptyLibrary>
      </LibraryContainer>
    );
  }

  return (
    <LibraryContainer>
      <SectionHeader>
        <SectionTitle>📚 Mi Biblioteca</SectionTitle>
        <Count>{library.length} canciones</Count>
      </SectionHeader>
      <div>
        {library.map((song) => (
          <div key={song.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ flex: 1 }}>
              <Song
                title={song.title}
                artist={song.artist}
                album={song.album}
                duration={song.duration}
                isInLibrary={true}
              />
            </div>
            <RemoveButton onClick={() => handleRemoveSong(song.id)}>
              🗑️ Eliminar
            </RemoveButton>
          </div>
        ))}
      </div>
    </LibraryContainer>
  );
};

export default Library;