import React, { Component } from 'react';
import Header from '../../components/Header';
import getMusics from '../../services/musicsAPI';
import FavoriteTracks from '../../components/FavoriteTracks';
import { addSong, removeSong } from '../../services/favoriteSongsAPI';
import './favorites.css';

export default class Favorites extends Component {
  constructor() {
    super();
    this.getFavoriteMusicsSaved = this.getFavoriteMusicsSaved.bind(this);
    this.saveTracks = this.saveTracks.bind(this);
    this.state = {
      favoriteMusics: [],
    };
  }

  componentDidMount() {
    this.getFavoriteMusicsSaved();
  }

  saveTracks({ target }) {
    if (!JSON.parse(localStorage.getItem('favorite_songs'))) {
      localStorage.setItem('favorite_songs', JSON.stringify([]));
    }
    this.setState((prev) => ({
      favoriteMusics: [...prev.favoriteMusics.filter((e) => e.trackId !== Number(target.value) )]
    }))
    const faveSongs = JSON.parse(localStorage.getItem('favorite_songs'));
    const isItSaved = faveSongs.some((e) => e === target.value);
    if (!isItSaved) {
      addSong(target.value);
        
    } if (isItSaved) {
      removeSong(target.value);
    }
  }

 async getFavoriteMusicsSaved() {
    if (!JSON.parse(localStorage.getItem('favorite_songs'))) {
      localStorage.setItem('favorite_songs', JSON.stringify([]));
    }
    const faveSongs = JSON.parse(localStorage.getItem('favorite_songs'));
    for(const track of faveSongs ) {
      const data = await getMusics(track);
      this.setState((prev) => ({
        favoriteMusics:[...prev.favoriteMusics, ...data],
      }))
    }
  }
  render() {
    const { favoriteMusics } = this.state;
    return (
      <>
        <Header />
        <div className="all-tracks">
          { favoriteMusics.map((e, i) => (
            <FavoriteTracks
              key={ i }
            img={ e.artworkUrl100 }
            artistName={ e.artistName }
            trackName={ e.trackName }
            audio={ e.previewUrl }
            trackID={ `${e.trackId}` }
            saveTracks={ this.saveTracks }
            />
          )) }
        </div>
      </>
    )
  }
}
