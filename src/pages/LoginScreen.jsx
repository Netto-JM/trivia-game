import React, { Component } from 'react';
import logo from '../trivia.png';

class LoginScreen extends Component {
  state = {
    user: '',
    email: '',
    buttonDisable: true,
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
            <button
              type="submit"
              disabled={ buttonDisable }
              data-testid="btn-play"
            >
              Play
            </button>
          </form>
        </header>
      </div>
    );
  }
}

export default LoginScreen;
