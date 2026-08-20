import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import SearchResults from './components/SearchResults/SearchResults';
import Library from './components/Library/Library';

// Datos ficticios para resultados de búsqueda
const datosFicticios = [
  {
    id: 1,
    title: "Bohemian Rhapsody",
    artist: "Queen",
    album: "A Night at the Opera",
    duration: "5:55"
  },
  {
    id: 2,
    title: "Imagine",
    artist: "John Lennon",
    album: "Imagine",
    duration: "3:03"
  },
  {
    id: 3,
    title: "Billie Jean",
    artist: "Michael Jackson",
    album: "Thriller",
    duration: "4:54"
  },
  {
    id: 4,
    title: "Like a Rolling Stone",
    artist: "Bob Dylan",
    album: "Highway 61 Revisited",
    duration: "6:13"
  },
  {
    id: 5,
    title: "Stairway to Heaven",
    artist: "Led Zeppelin",
    album: "Led Zeppelin IV",
    duration: "8:02"
  },
  {
    id: 6,
    title: "Smells Like Teen Spirit",
    artist: "Nirvana",
    album: "Nevermind",
    duration: "5:01"
  }
];

const App = () => {
  // Estado para resultados de búsqueda
  const [searchResults] = useState(datosFicticios);
  
  // Estado para biblioteca personal (inicialmente vacía)
  const [library, setLibrary] = useState([]);

  // useEffect para imprimir mensaje cuando la biblioteca se actualiza
  useEffect(() => {
    console.log(`📚 Biblioteca actualizada: ${library.length} canciones`);
    if (library.length > 0) {
      console.log('🎵 Canciones en biblioteca:', library.map(s => s.title).join(', '));
    }
  }, [library]);

  // Función para agregar canciones a la biblioteca
  const addToLibrary = (song) => {
    // Verificar si la canción ya está en la biblioteca
    if (!library.some(libSong => libSong.title === song.title)) {
      setLibrary([...library, song]);
      console.log(`✅ Agregada: "${song.title}" - ${song.artist}`);
    } else {
      console.log(`⚠️ "${song.title}" ya está en tu biblioteca`);
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="app-content">
        <SearchResults 
          results={searchResults} 
          onAddSong={addToLibrary}
          library={library}
        />
        <Library songs={library} />
      </div>
    </div>
  );
};

export default App;