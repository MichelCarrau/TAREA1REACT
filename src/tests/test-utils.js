import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ThemeProvider } from 'styled-components';
import { MemoryRouter } from 'react-router-dom';
import libraryReducer from '../redux/slices/librarySlice';
import searchReducer from '../redux/slices/searchSlice';
import { theme } from '../styles/theme';
import '@testing-library/jest-dom';

export const renderWithProviders = (
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: { library: libraryReducer, search: searchReducer },
      preloadedState,
    }),
    route = '/',
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }) => (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
      </ThemeProvider>
    </Provider>
  );

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

// Helper para crear un store de prueba con datos
export const createTestStore = (preloadedState = {}) =>
  configureStore({
    reducer: { library: libraryReducer, search: searchReducer },
    preloadedState,
  });