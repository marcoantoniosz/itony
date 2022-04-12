import React, { Component } from 'react';
import './favoritetracks.css'

export default class FavoriteTracks extends Component {
  render() {
    const { img, artistName, trackName, audio, trackID, saveTracks } = this.props;
    return (
      <div className="fave-tracks-cont">
        <img src={ img } alt={ trackName } />
        <h4>{ trackName }</h4>
        <h6>{ artistName }</h6>
        <audio className="audio-component" src={ audio } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
          <label className="star-box">
            <input 
            className="star"
            type="checkbox"
            value={ trackID }
            onClick={ saveTracks }
            checked
            readOnly />
          </label>
      </div>
    )
  }
}
