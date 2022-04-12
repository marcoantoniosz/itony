import React from 'react';
import { Link } from 'react-router-dom';
import './albumcards.css';

export class AlbumCards extends React.Component {
  render() {
    const { albumImg,
      albumName, artistName, toAlbum } = this.props;
    return (
      <div className="album-card">
        <div>
          <Link
            style={ { textDecoration: 'none' } }
            to={ toAlbum }
          >
            <img className="album-image" src={ albumImg } alt={ albumName } />
          </Link>
        </div>
        <Link
          style={ { textDecoration: 'none' } }
          to={ toAlbum }
        >
          {albumName}
        </Link>
        <h4>{ artistName }</h4>
      </div>
    );
  }
}

export default AlbumCards;