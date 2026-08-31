import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { fetchSongs } from '../../redux/slices/searchSlice';

const SearchContainer = styled.form`
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
  background: ${props => props.theme.colors.white};
  padding: 15px;
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: ${props => props.theme.shadows.medium};
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 12px 20px;
  border: 2px solid #e0e0e0;
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: 1em;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const SearchButton = styled.button`
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.primary}, 
    ${props => props.theme.colors.primaryLight}
  );
  color: ${props => props.theme.colors.white};
  border: none;
  padding: 12px 30px;
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: 1em;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(84, 66, 142, 0.3);
  }
`;

const SearchBar = () => {
  const [artist, setArtist] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (artist.trim()) {
      dispatch(fetchSongs(artist.trim()));
      localStorage.setItem('lastSearch', artist.trim());
    }
  };

  return (
    <SearchContainer onSubmit={handleSubmit}>
      <SearchInput
        id="search-artist"
        type="text"
        placeholder="Busca un artista... (ej: Coldplay, Oasis, Queen)"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
      />
      <SearchButton type="submit">🔍 Buscar</SearchButton>
    </SearchContainer>
  );
};

export default SearchBar;