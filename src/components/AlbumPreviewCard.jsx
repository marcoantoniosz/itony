import React from 'react';
import './albumcards.css';

export default class AlbumPreviewCard extends React.Component {
  render() {
    const { albumImg,
      albumName, artistName } = this.props;
    return (
      <div className="album-card">
        <div>
            <img className="album-image" src={ albumImg } alt={ albumName } />
        </div>
          {albumName}
        <h4>{ artistName }</h4>
      </div>
    );
  }
}