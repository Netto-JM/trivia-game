import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../trivia.png';

class LoginScreen extends Component {
  state = {
    user: '',
    email: '',
    buttonDisable: true,
  };

  apiRequest = async () => {
    const api = 'https://opentdb.com/api_token.php?command=request';
    const response = await fetch(api);
    const data = await response.json();
    const { token } = data;
    localStorage.setItem('token', token);
  };

  handleGame = () => {
    const { history } = this.props;
    history.push('/gamescreen');
  };

  redirect = async () => {
    await this.apiRequest();
    this.handleGame();
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

  handleSettings = () => {
    const { history } = this.props;
    history.push('/settings');
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
              onClick={ this.redirect }
              data-testid="btn-play"
            >
              Play
            </button>
            {' '}
            {' '}
            <button
              type="button"
              data-testid="btn-settings"
              onClick={ this.handleSettings }
            >
              Configurações
            </button>
          </form>
        </header>
      </div>
    );
  }
}

LoginScreen.propTypes = {
  history: PropTypes.string,
}.isRequired;

export default connect()(LoginScreen);
