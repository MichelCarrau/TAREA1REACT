import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [artist, setArtist] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (artist.trim()) {
      onSearch(artist.trim());
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Busca un artista... (ej: Coldplay, Oasis)"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="search-button">
        🔍 Buscar
      </button>
    </form>
  );
};

export default SearchBar;