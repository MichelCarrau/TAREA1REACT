import { configureStore } from '@reduxjs/toolkit';
import libraryReducer, {
  addSong,
  removeSong,
} from '../redux/slices/librarySlice';

const createTestStore = () =>
  configureStore({
    reducer: { library: libraryReducer },
    preloadedState: { library: [] },
  });

describe('librarySlice', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('estado inicial es array vacío', () => {
    const store = createTestStore();
    expect(store.getState().library).toEqual([]);
  });

  test('addSong agrega una canción y la guarda en localStorage', () => {
    const store = createTestStore();
    store.dispatch(addSong({ id: '1', title: 'Yellow', artist: 'Coldplay' }));

    expect(store.getState().library.length).toBe(1);
    expect(store.getState().library[0].title).toBe('Yellow');
    expect(localStorage.getItem('biblioteca')).toContain('Yellow');
  });

  test('addSong no duplica canciones con el mismo id', () => {
    const store = createTestStore();
    const song = { id: '1', title: 'Yellow' };
    store.dispatch(addSong(song));
    store.dispatch(addSong(song));

    expect(store.getState().library.length).toBe(1);
  });

  test('removeSong elimina la canción correcta', () => {
    const store = createTestStore();
    store.dispatch(addSong({ id: '1', title: 'Yellow' }));
    store.dispatch(addSong({ id: '2', title: 'Fix You' }));
    store.dispatch(removeSong('1'));

    expect(store.getState().library.length).toBe(1);
    expect(store.getState().library[0].id).toBe('2');
  });
});