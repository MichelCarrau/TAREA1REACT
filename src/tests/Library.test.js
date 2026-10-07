import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import Library from '../components/Library/Library';
import { renderWithProviders } from './test-utils';

describe('Library', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('muestra el mensaje vacío cuando no hay canciones', () => {
    renderWithProviders(<Library />, {
      preloadedState: { library: [], search: { results: [], loading: false, error: null } },
    });
    expect(screen.getByText(/No tienes canciones guardadas/i)).toBeInTheDocument();
    expect(screen.getByText(/0 canciones/i)).toBeInTheDocument();
  });

  test('renderiza las canciones guardadas', () => {
    const library = [
      { id: '1', title: 'Yellow', album: 'Parachutes', duration: '4:29' },
      { id: '2', title: 'Fix You', album: 'X&Y', duration: '4:55' },
    ];
    renderWithProviders(<Library />, {
      preloadedState: { library, search: { results: [], loading: false, error: null } },
    });

    expect(screen.getByText('Yellow')).toBeInTheDocument();
    expect(screen.getByText('Fix You')).toBeInTheDocument();
    expect(screen.getByText(/2 canciones/i)).toBeInTheDocument();
  });

  test('elimina una canción al hacer click en Eliminar', () => {
    const library = [
      { id: '1', title: 'Yellow', album: 'Parachutes', duration: '4:29' },
    ];
    const { store } = renderWithProviders(<Library />, {
      preloadedState: { library, search: { results: [], loading: false, error: null } },
    });

    const removeBtn = screen.getByRole('button', { name: /Eliminar/i });
    fireEvent.click(removeBtn);

    expect(store.getState().library.length).toBe(0);
  });
});