import React, { Component } from 'react';
import Header from '../../components/Header';
import { BiUserCircle } from 'react-icons/bi';
import { IconContext } from 'react-icons';
import './profile.css'

export default class ProfileEdit extends Component {
  constructor() {
    super();
    this.handleTextArea = this.handleTextArea.bind(this);
    this.state = {
      userName: '',
      email: '',
    }
  }

  handleTextArea({ target }) {
    const { name } = target;
    this.setState({ [name]: target.value });
  }

  saveEditData = () => {
    const userData = JSON.parse(localStorage.getItem('user'));
    const { userName, email } = this.state;
    const { password } = userData;
    const newData = {
      userName,
      email,
      password,
    }
    localStorage.setItem('user', JSON.stringify(newData));
    this.props.history.push("/profile");
  }
  render() {
    const icone = <BiUserCircle />;
    const { userName, email } = this.state;
    return (
    <>
      <Header />
      <div className="profile-main">
        <div className="user-data">
          <div className="p-icon">
            <IconContext.Provider value={ { size: '10em' } }>
                <div>
                   {icone}
                </div>
              </IconContext.Provider>
          </div>
          <div className="inputs-edit">
            <label>
              <p>Nome de Usuário</p>
              <input type="text" name="userName" onChange={ this.handleTextArea } value={ userName } className="text-inputs" />
            </label>
            <label>
              <p>Email</p>
              <input type="text" onChange={ this.handleTextArea } value={ email } name="email" className="text-inputs" />
            </label>
          </div>
          <div className="btns">
            <button type="button" onClick={ this.saveEditData } className="form-button mbl btn-m resiz">Salvar</button>
          </div>
        </div>
      </div>
    </>
    );
  }
}
