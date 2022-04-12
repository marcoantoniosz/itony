import React, { Component } from 'react';
import CreateUser from './CreateUser';


export default class Login extends Component {
  constructor() {
    super();
    this.handleTextArea = this.handleTextArea.bind(this);
    this.login = this.login.bind(this);
    this.state = {
      isUserRegistered: undefined,
      userName: '',
      password: '',
      uNError: [],
      pWError: [],
    }
  }

  componentDidMount(){
    this.isUserRegistered();
  }

  handleTextArea({ target }) {
    const { name } = target;
    this.setState({ [name]: target.value,
      uNError: [],
      pWError: [],
     });
  }

  redefineUser() {
    localStorage.clear();
    window.location.reload(false);
  }

  login() {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    const { userName, password } = this.state;
    const inputLowered = userName.toLowerCase();
    const userLowered = userInfo.userName.toLowerCase();
    if (inputLowered !== userLowered) {
      this.setState({
        uNError: ['Nome de usuário inválido']
      })
    }
        
    if( password !== userInfo.password ) {
      this.setState({
        pWError: ['Senha inválida']
      })
      }
    if (inputLowered === userLowered && password === userInfo.password ) {
      this.props.history.push("/search"); 
    }
  }

  isUserRegistered = () => {
    const isIt = JSON.parse(localStorage.getItem('registered'));
    this.setState({
      isUserRegistered: isIt,
    })
  }
  render() {
    const { userName, password, uNError, pWError } = this.state;
    const loginProcess = (
      <>
        <div className="login-father">
          <img className="logo-img" src="https://uploaddeimagens.com.br/images/003/635/361/full/iTonyremovido.png?1642514577" alt="" />
          <form className="login-content">
            <h1>Login</h1>
            <label htmlFor="user">
              <h3>Usuário</h3>
              <input
                className="text-inputs"
                name="userName"
                id="user"
                type="text"
                onChange={ this.handleTextArea }
                value={ userName }
              />
            </label>
            <label htmlFor="user">
              <h3>Senha</h3>
              <input
                className="text-inputs"
                name="password"
                type="password"
                onChange={ this.handleTextArea }
                value={ password }
              />
            </label>
            <p className="error-input">{uNError}</p>
            <p className="error-input">{pWError}</p>
            <button
              type="button"
              className="form-button"
              onClick={ this.login }
            >
              Entrar
            </button>
            <button onClick={ this.redefineUser } className="form-button" type="button">
              Redefinir
            </button>
          </form>
        </div>
      </>
    );
    const { isUserRegistered } = this.state
    return (
      <div>
        {isUserRegistered ? loginProcess : <CreateUser /> }
      </div>
    );
  }
}
