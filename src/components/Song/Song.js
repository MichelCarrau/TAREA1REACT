import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SongCard = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: 18px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid ${props => props.theme.colors.lightGray};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-bottom: 12px;

  &:hover {
    transform: translateX(8px) scale(1.01);
    border-color: ${props => props.theme.colors.secondary};
    box-shadow: ${props => props.theme.shadows.medium};
  }
`;

const SongInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 1;
`;

const SongIcon = styled.div`
  width: 45px;
  height: 45px;
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.secondary}, 
    ${props => props.theme.colors.secondaryDark}
  );
  border-radius: ${props => props.theme.borderRadius.small};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.white};
  font-size: 1.2em;
  flex-shrink: 0;
  transition: transform 0.3s ease;

  ${SongCard}:hover & {
    transform: scale(1.1) rotate(-5deg);
  }
`;

const SongDetails = styled.div`
  flex: 1;
`;

const SongTitle = styled.h3`
  color: ${props => props.theme.colors.black};
  font-size: 1.1em;
  font-weight: 600;
  margin-bottom: 4px;
  transition: color 0.3s ease;

  ${SongCard}:hover & {
    color: ${props => props.theme.colors.primary};
  }
`;

const SongLink = styled(Link)`
  color: ${props => props.theme.colors.black};
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
    text-decoration: underline;
  }
`;

const SongArtist = styled.p`
  color: ${props => props.theme.colors.primaryLight};
  font-weight: 500;
  font-size: 0.95em;
  margin-bottom: 2px;

  &::before {
    content: '👤 ';
    opacity: 0.6;
  }
`;

const SongAlbum = styled.p`
  color: #999;
  font-size: 0.85em;

  &::before {
    content: '💿 ';
    opacity: 0.5;
  }
`;

const SongRight = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const SongDuration = styled.span`
  color: ${props => props.theme.colors.gray};
  font-weight: 500;
  font-size: 0.95em;
  background: #f8f9fa;
  padding: 6px 16px;
  border-radius: 20px;
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;

  ${SongCard}:hover & {
    background: ${props => props.theme.colors.secondary};
    border-color: ${props => props.theme.colors.secondaryDark};
    color: ${props => props.theme.colors.secondaryDarker};
  }
`;

const AddButton = styled.button`
  background: ${props => props.theme.colors.secondary};
  border: none;
  padding: 6px 15px;
  border-radius: 20px;
  color: ${props => props.theme.colors.secondaryDarker};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.secondaryDark};
    transform: scale(1.05);
  }
`;

const BadgeAdded = styled.span`
  background: #e8f5e9;
  color: ${props => props.theme.colors.success};
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 0.85em;
  font-weight: 500;
`;

const Song = ({ title, artist, album, duration, onAdd, isInLibrary, id, showLink = false }) => {
  return (
    <SongCard>
      <SongInfo>
        <SongIcon>🎵</SongIcon>
        <SongDetails>
          <SongTitle>
            {showLink ? (
              <SongLink to={`/song/${id || title}`}>{title}</SongLink>
            ) : (
              title
            )}
          </SongTitle>
          <SongArtist>{artist}</SongArtist>
          <SongAlbum>{album || 'Álbum desconocido'}</SongAlbum>
        </SongDetails>
      </SongInfo>
      <SongRight>
        {duration && <SongDuration>⏱️ {duration}</SongDuration>}
        {onAdd && !isInLibrary && (
          <AddButton onClick={() => onAdd({ title, artist, album, duration })}>
            ➕ Agregar
          </AddButton>
        )}
        {isInLibrary && <BadgeAdded>✅ En biblioteca</BadgeAdded>}
      </SongRight>
    </SongCard>
  );
};

export default Song;