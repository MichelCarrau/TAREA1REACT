import { createStore } from 'redux';
import libraryReducer from './libraryReducer';

// Crear el store con el reducer
const store = createStore(libraryReducer);

export default store;