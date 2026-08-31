import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk para buscar canciones
export const fetchSongs = createAsyncThunk(
  'search/fetchSongs',
  async (artistName, { rejectWithValue }) => {
    try {
      const url = `/api/v1/json/2/searchalbum.php?s=${artistName}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.album) return [];
      
      return data.album.map((album, index) => ({
        id: album.idAlbum || `album-${index}`,
        title: album.strAlbum || 'Álbum sin título',
        artist: album.strArtist || artistName || 'Artista desconocido',
        album: album.strAlbum || 'Álbum desconocido',
        duration: null,
        strTrack: album.strAlbum,
        strArtist: album.strArtist,
        strAlbum: album.strAlbum,
        idAlbum: album.idAlbum
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    results: [],
    loading: false,
    error: null
  },
  reducers: {
    resetResults: (state) => {
      state.results = [];
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongs.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.results = [];
      })
      .addCase(fetchSongs.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
        state.error = null;
      })
      .addCase(fetchSongs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error al cargar los datos';
        state.results = [];
      });
  }
});

export const { resetResults } = searchSlice.actions;
export default searchSlice.reducer;