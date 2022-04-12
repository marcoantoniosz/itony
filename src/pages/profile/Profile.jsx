import React, { Component } from 'react';
import Header from '../../components/Header';
import { BiUserCircle } from 'react-icons/bi';
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';
import './profile.css'

export default class Profile extends Component {
  constructor() {
    super();
    this.getUserData = this.getUserData.bind(this);
    this.state = {
      nome: '',
      email: '',
    }
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData() {
    const userData = JSON.parse(localStorage.getItem('user'));
    const { userName, email } = userData;
    this.setState({
      nome: userName,
      email,
    })
  }

  render() {
    const { nome, email } = this.state;
    const icone = <BiUserCircle />;
    return (
      <>
        <Header />
        <div className="profile-main">
          <div className="user-data">
            <div>
            <IconContext.Provider value={ { size: '10em' } }>
                <div>
                  {icone}
                </div>
              </IconContext.Provider>
            </div>
            <h1 className="profile-texts">Nome de usuário: { nome }</h1>
            <h1 className="profile-texts">Email cadastrado: { email }</h1>
            <Link to="/profile/edit">
            <button type="button" className="form-button btn-m">Editar</button>
            </Link>
          </div>
        </div>
      </>
    )
  }
}
