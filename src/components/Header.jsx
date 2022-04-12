import React, { Component } from 'react';
import { BiUserCircle } from 'react-icons/bi';
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';
import './header.css'

export default class Header extends Component {
  constructor() {
    super();
    this.getUserName = this.getUserName.bind(this);
    this.state = {
      uN: '',
    };
  }

  componentDidMount() {
    this.getUserName();
  }

  async getUserName() {
    const userName = JSON.parse(localStorage.getItem('user')).userName;
    this.setState({
      uN: userName,
    })
  }

  render() {
    const { uN } = this.state;
    const icone = <BiUserCircle />;
    const gotUN = (
      <div className="logo-and-name">
        <img src="https://uploaddeimagens.com.br/images/003/635/361/full/iTonyremovido.png?1642514577" alt="logo-header" className="logo-header" />
        <nav className="navigation">
          <div className="nav-link">
            <Link
              style={ { textDecoration: 'none' } }
              data-testid="link-to-search"
              to="/search"
            >
              Pesquisar
            </Link>
          </div>
          <div className="nav-link">
            <Link
              style={ { textDecoration: 'none' } }
              data-testid="link-to-favorites"
              to="/favorites"
            >
              Favoritos
            </Link>
          </div>
          <div className="nav-link">
            <Link
              style={ { textDecoration: 'none' } }
              data-testid="link-to-profile"
              to="/profile"
            >
              Perfil
            </Link>
          </div>
        </nav>
        <div className="user-content">
          <IconContext.Provider value={ { size: '3em' } }>
            <div>
              {icone}
            </div>
          </IconContext.Provider>
          <h2 className="user-head">{uN}</h2>
        </div>
      </div>
    )
    return (
      <header data-testid="header-component">
        { gotUN }
      </header>
    );
  }
}
