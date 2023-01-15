import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchGame, INVALID_TOKEN_ERROR } from '../redux/actions';

class Game extends Component {
  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchGame());
  }

  render() {
    const { questions, errorMessage, history } = this.props;
    if (errorMessage === INVALID_TOKEN_ERROR) {
      localStorage.removeItem('token');
      history.push('/');
    }

    console.log('questions: ', questions);

    return (
      <div>
        <h1>Game</h1>
        <Header />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.game.questions,
  errorMessage: state.game.errorMessage,
});

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  history: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps)(Game);
