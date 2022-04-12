import React from 'react';
import Header from '../../components/Header';
import AlbumCards from '../../components/AlbumCards';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import './search.css'

export class Search extends React.Component {
  constructor() {
    super();
    this.handleTextArea = this.handleTextArea.bind(this);
    this.checkUserLength = this.checkUserLength.bind(this);
    this.getAlbums = this.getAlbums.bind(this);
    this.state = {
      searchInput: '',
      isItValid: true,
      searching: false,
      artistName: '',
      artistAlbums: [],
      albumListLength: undefined,
    };
  }

  handleTextArea({ target }) {
    this.setState({ searchInput: target.value }, () => this.checkUserLength());
  }

  async getAlbums() {
    const { searchInput } = this.state;
    this.setState({
      albumListLength: undefined,
      artistName: searchInput,
      searching: true,
    }, async () => {
      const cacthingAlbums = await searchAlbumsAPI(searchInput);
      this.setState({ searchInput: '',
        searching: false,
        isItValid: true,
        artistAlbums: cacthingAlbums,
        albumListLength: cacthingAlbums.length,
      });
    });
  }

  checkUserLength() {
    const { searchInput } = this.state;
    const minimalL = 2;
    if (searchInput.length >= minimalL) {
      this.setState({ isItValid: false });
    } else {
      this.setState({ isItValid: true });
    }
  }

  checkAlbumListLength(prop) {
    const { artistAlbums } = this.state;
    const renderAlbums = artistAlbums.map((e) => (<AlbumCards
      key={ e.collectionId }
      albumID={ `${e.collectionId}` }
      albumImg={ e.artworkUrl100 }
      albumName={ e.collectionName }
      artistName={ e.artistName }
      toAlbum={ `/album/${e.collectionId}` }
    />));
    if (prop === undefined) {
      return undefined;
    } if (prop === 0) {
      return <h1 className="album-result">Nenhum álbum foi encontrado</h1>;
    } if (prop >= 1) {
      return renderAlbums;
    }
  }

  render() {
    const { searchInput,
      isItValid,
      searching,
      artistName,
      albumListLength,
    } = this.state;
    const searchLoading = <span className="on-loading">Carregando...</span>;
    const searchForm = (
      <div className="search-cont">
        <form className="search-form">
          <label htmlFor="search-input">
            <input
              className="search-input"
              value={ searchInput }
              onChange={ this.handleTextArea }
              type="text"
            />
          </label>
          <button
            onClick={ this.getAlbums }
            className="user-button"
            disabled={ isItValid }
            type="button"
          >
            🔍
          </button>
        </form>
      </div>
    );
    const gotArtistAlbums = (
      <h1 className="album-result">
        Resultado de álbuns de:
        { ` ${artistName}` }
      </h1>);
    return (
      <div data-testid="page-search">
        <Header />
        <div className="input-text-cont">
          { searching ? searchLoading : searchForm }
          { albumListLength >= 1 ? gotArtistAlbums : undefined }
        </div>
        <div className="albums-container">
          { this.checkAlbumListLength(albumListLength) }
        </div>
      </div>
    );
  }
}

export default Search;