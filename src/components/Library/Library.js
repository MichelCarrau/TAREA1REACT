import React from 'react';
import styled from 'styled-components';
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

const Library = ({ songs }) => {
  return (
    <LibraryContainer>
      <SectionHeader>
        <SectionTitle>📚 Mi Biblioteca</SectionTitle>
        <Count>{songs.length} canciones</Count>
      </SectionHeader>
      {songs.length === 0 ? (
        <EmptyLibrary>
          <EmptyText>🎶 No tienes canciones guardadas</EmptyText>
          <SubText>Busca y agrega tus canciones favoritas</SubText>
        </EmptyLibrary>
      ) : (
        <div>
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
    </LibraryContainer>
  );
};

export default Library;