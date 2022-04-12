import React, { Component } from 'react';
import './musiccard.css';

export default class MusicCard extends Component {
  render() {
    const { trackTitle, trackUrl, trackID, saveTracks,  checking } = this.props;
    return (
      <div className="track">
        <div className="track-title">
          <h4>{ trackTitle }</h4>
        </div>
        <audio className="audio-component" src={ trackUrl } controls>
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
            defaultChecked={ checking } />
          </label>
      </div>
    );
  }
}
