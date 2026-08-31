// Estado inicial: leer desde localStorage
const getInitialState = () => {
  try {
    const savedLibrary = localStorage.getItem('biblioteca');
    return savedLibrary ? JSON.parse(savedLibrary) : [];
  } catch (error) {
    console.error('Error al leer localStorage:', error);
    return [];
  }
};

const initialState = getInitialState();

// Reducer para manejar la biblioteca
const libraryReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case 'ADD_SONG':
      // Verificar si la canción ya existe
      if (state.some(song => song.id === action.payload.id)) {
        return state;
      }
      // Agregar nueva canción
      newState = [...state, action.payload];
      // Guardar en localStorage
      localStorage.setItem('biblioteca', JSON.stringify(newState));
      return newState;

    case 'REMOVE_SONG':
      // Filtrar para eliminar la canción con el ID indicado
      newState = state.filter(song => song.id !== action.payload);
      // Guardar en localStorage
      localStorage.setItem('biblioteca', JSON.stringify(newState));
      return newState;

    default:
      return state;
  }
};

export default libraryReducer;