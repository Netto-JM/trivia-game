import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';

import logo from '../trivia.png';
import { saveUser } from '../redux/actions';

export const apiRequest = async () => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await response.json();
  return data;
};

class Login extends Component {
  state = {
    user: '',
    email: '',
    buttonDisable: true,
  };

  saveLocalStorage = ({ token }) => {
    localStorage.setItem('token', token);
  };

  redirect = (path) => {
    const { history } = this.props;
    history.push(path);
  };

  handlePlay = async () => {
    const { dispatch } = this.props;
    const { user, email } = this.state;
    const data = await apiRequest();
    const { response_message: msg } = data;

    const image = MD5(email).toString();

    if (msg === 'Token Generated Successfully!') {
      dispatch(saveUser({ name: user, email, image }));
      this.saveLocalStorage(data);
      return this.redirect('/game');
    }
  };

  handleChange = (event) => {
    const { target } = event;
    this.setState({
      [target.name]: target.value }, () => {
      const {
        user,
        email,
      } = this.state;
      const caracMin = 1;
      const format = /\S+@\S+\.\S+/;
      const buttonState = format.test(email)
        && user.length >= caracMin;
      this.setState({ buttonDisable: !buttonState });
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    const { user, email, buttonDisable } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <form onSubmit={ this.handleSubmit }>
            <label htmlFor="user">
              Nome de usuário:
              <input
                type="text"
                id="user"
                name="user"
                value={ user }
                onChange={ this.handleChange }
                data-testid="input-player-name"
              />
            </label>
            {' '}
            {' '}
            <label htmlFor="email">
              Email:
              <input
                type="email"
                name="email"
                value={ email }
                onChange={ this.handleChange }
                id="email"
                data-testid="input-gravatar-email"
              />
            </label>
            {' '}
            {' '}
            <button
              type="submit"
              disabled={ buttonDisable }
              onClick={ this.handlePlay }
              data-testid="btn-play"
            >
              Play
            </button>
            {' '}
            {' '}
            <button
              type="button"
              data-testid="btn-settings"
              onClick={ () => { this.redirect('/settings'); } }
            >
              Configurações
            </button>
          </form>
        </header>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
};

export default connect()(Login);
