import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithProviders } from './test-utils';

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renderiza Header, SearchBar, SearchResults y Library', () => {
    renderWithProviders(<App />, { route: '/' });

    expect(screen.getByText(/Mi Biblioteca Musical/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Busca un artista/i)).toBeInTheDocument();
    expect(screen.getByText(/Resultados de búsqueda/i)).toBeInTheDocument();
    expect(screen.getByText(/Mi Biblioteca$/i)).toBeInTheDocument();
  });

  test('muestra los resultados cuando el store tiene canciones', () => {
    const songs = [
      { id: '1', title: 'Yellow', artist: 'Coldplay', album: 'Parachutes' },
    ];
    renderWithProviders(<App />, {
      route: '/',
      preloadedState: {
        search: { results: songs, loading: false, error: null },
        library: [],
      },
    });

    expect(screen.getByText('Yellow')).toBeInTheDocument();
    expect(screen.getByText('Coldplay')).toBeInTheDocument();
  });
});