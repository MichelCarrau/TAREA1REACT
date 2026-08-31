import { createSlice } from '@reduxjs/toolkit';

// Cargar estado inicial desde localStorage
const getInitialState = () => {
  try {
    const saved = localStorage.getItem('biblioteca');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const librarySlice = createSlice({
  name: 'library',
  initialState: getInitialState(),
  reducers: {
    addSong: (state, action) => {
      const exists = state.some(song => song.id === action.payload.id);
      if (!exists) {
        state.push(action.payload);
        localStorage.setItem('biblioteca', JSON.stringify(state));
      }
    },
    removeSong: (state, action) => {
      const newState = state.filter(song => song.id !== action.payload);
      localStorage.setItem('biblioteca', JSON.stringify(newState));
      return newState;
    }
  }
});

export const { addSong, removeSong } = librarySlice.actions;
export default librarySlice.reducer;