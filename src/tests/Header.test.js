import React from 'react';
import { screen } from '@testing-library/react';
import Header from '../components/Header/Header';
import { renderWithProviders } from './test-utils';

describe('Header', () => {
  test('renderiza el título de la aplicación', () => {
    renderWithProviders(<Header />);
    expect(screen.getByText(/Mi Biblioteca Musical/i)).toBeInTheDocument();
  });

  test('renderiza el subtítulo', () => {
    renderWithProviders(<Header />);
    expect(
      screen.getByText(/Encuentra tus canciones favoritas/i)
    ).toBeInTheDocument();
  });

  test('no muestra contenido adicional fuera del header', () => {
    const { container } = renderWithProviders(<Header />);
    // Solo debe haber 1 header
    expect(container.querySelectorAll('header').length).toBe(1);
  });
});