// Action para agregar una canción
export const addSong = (song) => {
  return {
    type: 'ADD_SONG',
    payload: song
  };
};

// Action para eliminar una canción
export const removeSong = (songId) => {
  return {
    type: 'REMOVE_SONG',
    payload: songId
  };
};