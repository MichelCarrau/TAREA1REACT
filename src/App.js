import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Song from './components/Song';

class App extends Component {
  canciones = [
    {
      id: 1,
      title: "Bohemian Rhapsody",
      artist: "Queen",
      album: "A Night at the Opera",
      duration: "5:55",
      genre: "Rock"
    },
    {
      id: 2,
      title: "Imagine",
      artist: "John Lennon",
      album: "Imagine",
      duration: "3:03",
      genre: "Pop"
    },
    {
      id: 3,
      title: "Billie Jean",
      artist: "Michael Jackson",
      album: "Thriller",
      duration: "4:54",
      genre: "Pop"
    },
    {
      id: 4,
      title: "Like a Rolling Stone",
      artist: "Bob Dylan",
      album: "Highway 61 Revisited",
      duration: "6:13",
      genre: "Folk Rock"
    },
    {
      id: 5,
      title: "Stairway to Heaven",
      artist: "Led Zeppelin",
      album: "Led Zeppelin IV",
      duration: "8:02",
      genre: "Rock"
    }
  ];

  componentDidMount() {
    console.log("🎵 ¡La Biblioteca Musical se ha cargado correctamente!");
    console.log(`📚 ${this.canciones.length} canciones disponibles`);
    console.log("💡 ¡Disfruta tu música! 🎶");
  }

  render() {
    return (
      <div className="App">
        <Header />
        <main className="song-list">
          <div className="song-list-header">
            <h2>
              📋 Mi Colección
              <span className="song-count">{this.canciones.length} canciones</span>
            </h2>
            <div style={{ fontSize: '0.9em', color: '#999' }}>
              🎧 Lista de reproducción
            </div>
          </div>
          <div className="songs-container">
            {this.canciones.map((cancion, index) => (
              <Song
                key={cancion.id}
                number={index + 1}
                title={cancion.title}
                artist={cancion.artist}
                album={cancion.album}
                duration={cancion.duration}
                genre={cancion.genre}
              />
            ))}
          </div>
        </main>
      </div>
    );
  }
}

export default App;