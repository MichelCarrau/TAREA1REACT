import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import SearchResults from '../components/SearchResults/SearchResults';
import { renderWithProviders } from './test-utils';

describe('SearchResults', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const songs = [
    { id: '1', title: 'Yellow', artist: 'Coldplay', album: 'Parachutes' },
    { id: '2', title: 'Wonderwall', artist: 'Oasis', album: '(What\'s the Story) Morning Glory?' },
  ];

  test('muestra mensaje vacío cuando no hay resultados', () => {
    renderWithProviders(<SearchResults />, {
      preloadedState: {
        search: { results: [], loading: false, error: null },
        library: [],
      },
    });
    expect(screen.getByText(/Busca un artista para ver sus canciones/i)).toBeInTheDocument();
  });

  test('muestra el spinner cuando loading es true', () => {
    renderWithProviders(<SearchResults />, {
      preloadedState: {
        search: { results: [], loading: true, error: null },
        library: [],
      },
    });
    expect(screen.getByText(/Cargando canciones/i)).toBeInTheDocument();
  });

  test('muestra mensaje de error', () => {
    renderWithProviders(<SearchResults />, {
      preloadedState: {
        search: { results: [], loading: false, error: 'Error de red' },
        library: [],
      },
    });
    expect(screen.getByText(/Error de red/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Reintentar/i })).toBeInTheDocument();
  });

  test('renderiza las canciones con título y artista', () => {
    renderWithProviders(<SearchResults />, {
      preloadedState: {
        search: { results: songs, loading: false, error: null },
        library: [],
      },
    });
    expect(screen.getByText('Yellow')).toBeInTheDocument();
    expect(screen.getByText('Coldplay')).toBeInTheDocument();
    expect(screen.getByText('Wonderwall')).toBeInTheDocument();
    expect(screen.getByText('Oasis')).toBeInTheDocument();
  });

  test('muestra el contador de canciones', () => {
    renderWithProviders(<SearchResults />, {
      preloadedState: {
        search: { results: songs, loading: false, error: null },
        library: [],
      },
    });
    expect(screen.getByText(/2 canciones/i)).toBeInTheDocument();
  });

  test('agrega una canción a la biblioteca al hacer click en Agregar', () => {
    const { store } = renderWithProviders(<SearchResults />, {
      preloadedState: {
        search: { results: songs, loading: false, error: null },
        library: [],
      },
    });

    const addButtons = screen.getAllByRole('button', { name: /Agregar/i });
    fireEvent.click(addButtons[0]);

    expect(store.getState().library.length).toBe(1);
    expect(store.getState().library[0].title).toBe('Yellow');
  });
});