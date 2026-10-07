import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import Song from '../components/Song/Song';
import { renderWithProviders } from './test-utils';

describe('Song', () => {
  const baseProps = {
    title: 'Yellow',
    artist: 'Coldplay',
    album: 'Parachutes',
    duration: '4:29',
  };

  test('renderiza título, artista y álbum', () => {
    renderWithProviders(<Song {...baseProps} />);
    expect(screen.getByText('Yellow')).toBeInTheDocument();
    expect(screen.getByText('Coldplay')).toBeInTheDocument();
    expect(screen.getByText('Parachutes')).toBeInTheDocument();
  });

  test('muestra el botón Agregar cuando onAdd está definido y no está en biblioteca', () => {
    const onAdd = jest.fn();
    renderWithProviders(<Song {...baseProps} onAdd={onAdd} isInLibrary={false} />);
    const btn = screen.getByRole('button', { name: /Agregar/i });
    expect(btn).toBeInTheDocument();

    fireEvent.click(btn);
    expect(onAdd).toHaveBeenCalledTimes(1);
  });

  test('muestra el badge "En biblioteca" cuando isInLibrary es true', () => {
    renderWithProviders(<Song {...baseProps} isInLibrary={true} />);
    expect(screen.getByText(/En biblioteca/i)).toBeInTheDocument();
  });

  test('no muestra botón Agregar si ya está en la biblioteca', () => {
    const onAdd = jest.fn();
    renderWithProviders(
      <Song {...baseProps} onAdd={onAdd} isInLibrary={true} />
    );
    expect(screen.queryByRole('button', { name: /Agregar/i })).not.toBeInTheDocument();
  });
});