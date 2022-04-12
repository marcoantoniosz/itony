import React from 'react';
import Header from '../../components/Header';
import MusicCard from '../../components/MusicCard';
import getMusics from '../../services/musicsAPI';
import AlbumPreviewCard from '../../components/AlbumPreviewCard';
import { addSong, removeSong } from '../../services/favoriteSongsAPI';
import './albumpreview.css'

class Album extends React.Component {
  constructor() {
    super();
    this.getAlbumID = this.getAlbumID.bind(this);
    this.saveTracks = this.saveTracks.bind(this);
    this.checkFavorites = this.checkFavorites.bind(this);
    this.state = {
      albumInfo: [],
      artistName: '',
      albumName: '',
      albumArtWork: '',
    };
  }

  componentDidMount() {
    this.getAlbumID();
  }

  async getAlbumID() {
    const { match } = this.props;
    const { id } = match.params;
    const objectAlbum = await getMusics(id);
    const data = objectAlbum.filter((e, i) => i !== 0);
    this.setState({ albumInfo: data,
      artistName: objectAlbum[0].artistName,
      albumName: objectAlbum[0].collectionName,
      albumArtWork: objectAlbum[0].artworkUrl100,
    });
  }

  saveTracks({ target }) {
    if (!JSON.parse(localStorage.getItem('favorite_songs'))) {
      localStorage.setItem('favorite_songs', JSON.stringify([]));
    }
    const faveSongs = JSON.parse(localStorage.getItem('favorite_songs'));
    const isItSaved = faveSongs.some((e) => e === target.value);
    if (!isItSaved) {
      addSong(target.value);
        
    } if (isItSaved) {
      removeSong(target.value);
    }
  }

  checkFavorites(id) {
    const format = id.toString();
    const faveSongs = JSON.parse(localStorage.getItem('favorite_songs'));
    const isItSaved = faveSongs.some((e) => e === format);
    return isItSaved;
  }

  render() {
    const { albumInfo, artistName, albumName, albumArtWork } = this.state;
    return (
      <div>
        <Header />
        <div className="album-preview-cont">
          <div>
            <AlbumPreviewCard albumImg={ albumArtWork } albumName={ albumName } artistName={ artistName } />
          </div>
          <div className="tracks-cont">
            { albumInfo.map((e, i) => (<MusicCard
              saveTracks={ this.saveTracks }
              testID={ `checkbox-music-${e.trackId}` }
              trackID={ `${e.trackId}` }
              key={ i }
              trackTitle={ e.trackName }
              trackUrl={ e.previewUrl }
              checking={ this.checkFavorites(e.trackId) }
            />)) }
          </div>
        </div>
      </div>
    );
  }
}

export default Album;
