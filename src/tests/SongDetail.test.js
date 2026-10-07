import React from 'react';
import { screen } from '@testing-library/react';
import SongDetail from '../components/SongDetail/SongDetail';
import { renderWithProviders } from './test-utils';

// Mockeamos useFetch para controlar qué devuelve
jest.mock('../hooks/UseFetch', () => ({
  __esModule: true,
  default: jest.fn(),
}));

import useFetch from '../hooks/UseFetch';

describe('SongDetail', () => {
  beforeEach(() => {
    useFetch.mockReset();
  });

  test('muestra el spinner cuando loading es true', () => {
    useFetch.mockReturnValue({ data: null, loading: true, error: null });

    renderWithProviders(<SongDetail />, { route: '/song/1' });

    expect(screen.getByText(/Cargando detalles/i)).toBeInTheDocument();
  });

  test('muestra mensaje de error cuando hay error', () => {
    useFetch.mockReturnValue({
      data: null,
      loading: false,
      error: 'Error al cargar',
    });

    renderWithProviders(<SongDetail />, { route: '/song/1' });

    expect(screen.getByText(/Error al cargar/i)).toBeInTheDocument();
  });

  test('renderiza los datos del álbum cuando carga', () => {
    useFetch.mockReturnValue({
      data: {
        album: [
          {
            strAlbum: 'Parachutes',
            strArtist: 'Coldplay',
            intYearReleased: '2000',
            strGenre: 'Rock',
          },
        ],
      },
      loading: false,
      error: null,
    });

    renderWithProviders(<SongDetail />, { route: '/song/1' });

expect(screen.getAllByText('Parachutes').length).toBeGreaterThan(0);
    expect(screen.getByText('Coldplay')).toBeInTheDocument();
  });
});