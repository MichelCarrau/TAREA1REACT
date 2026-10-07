import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar/SearchBar';
import { renderWithProviders } from './test-utils';

describe('SearchBar', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renderiza el input y el botón de búsqueda', () => {
    renderWithProviders(<SearchBar />);
    expect(
      screen.getByPlaceholderText(/Busca un artista/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Buscar/i })).toBeInTheDocument();
  });

  test('permite escribir en el input y actualiza el valor', () => {
    renderWithProviders(<SearchBar />);
    const input = screen.getByPlaceholderText(/Busca un artista/i);

    fireEvent.change(input, { target: { value: 'Coldplay' } });
    expect(input.value).toBe('Coldplay');
  });

  test('envía el formulario al hacer click en Buscar', () => {
    const { store } = renderWithProviders(<SearchBar />);
    const input = screen.getByPlaceholderText(/Busca un artista/i);
    const button = screen.getByRole('button', { name: /Buscar/i });

    fireEvent.change(input, { target: { value: 'Queen' } });
    fireEvent.click(button);

    // El thunk fetchSongs se dispara (pending se activa)
    expect(store.getState().search.loading).toBe(true);
  });

  test('guarda la búsqueda en localStorage', () => {
    renderWithProviders(<SearchBar />);
    const input = screen.getByPlaceholderText(/Busca un artista/i);
    const button = screen.getByRole('button', { name: /Buscar/i });

    fireEvent.change(input, { target: { value: 'Oasis' } });
    fireEvent.click(button);

    expect(localStorage.getItem('lastSearch')).toBe('Oasis');
  });

  test('no busca si el input está vacío', () => {
    const { store } = renderWithProviders(<SearchBar />);
    const button = screen.getByRole('button', { name: /Buscar/i });

    fireEvent.click(button);

    expect(store.getState().search.loading).toBe(false);
    expect(localStorage.getItem('lastSearch')).toBeNull();
  });
});