import { configureStore } from '@reduxjs/toolkit';
import searchReducer, {
  fetchSongs,
  resetResults,
} from '../redux/slices/searchSlice';

global.fetch = jest.fn();

const createTestStore = () =>
  configureStore({
    reducer: { search: searchReducer },
  });

describe('searchSlice', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('estado inicial correcto', () => {
    const store = createTestStore();
    expect(store.getState().search).toEqual({
      results: [],
      loading: false,
      error: null,
    });
  });

  test('resetResults limpia el estado', () => {
    const store = createTestStore();
    store.dispatch(resetResults());
    expect(store.getState().search).toEqual({
      results: [],
      loading: false,
      error: null,
    });
  });

  test('fetchSongs.pending activa loading', () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ album: [] }),
    });

    const store = createTestStore();
    store.dispatch(fetchSongs('Test'));

    expect(store.getState().search.loading).toBe(true);
    expect(store.getState().search.error).toBeNull();
  });

  test('fetchSongs.fulfilled guarda los resultados', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        album: [
          { idAlbum: '1', strAlbum: 'Parachutes', strArtist: 'Coldplay' },
          { idAlbum: '2', strAlbum: 'X&Y', strArtist: 'Coldplay' },
        ],
      }),
    });

    const store = createTestStore();
    await store.dispatch(fetchSongs('Coldplay'));

    const state = store.getState().search;
    expect(state.loading).toBe(false);
    expect(state.results.length).toBe(2);
    expect(state.results[0].title).toBe('Parachutes');
    expect(state.error).toBeNull();
  });

  test('fetchSongs.fulfilled retorna [] cuando no hay album', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    const store = createTestStore();
    await store.dispatch(fetchSongs('Nada'));

    expect(store.getState().search.results).toEqual([]);
  });

  test('fetchSongs.rejected cuando la respuesta no es ok', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const store = createTestStore();
    await store.dispatch(fetchSongs('Test'));

    const state = store.getState().search;
    expect(state.loading).toBe(false);
    expect(state.error).toContain('500');
    expect(state.results).toEqual([]);
  });

  test('fetchSongs.rejected cuando fetch lanza excepción', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    const store = createTestStore();
    await store.dispatch(fetchSongs('Test'));

    expect(store.getState().search.error).toBe('Network error');
  });
});