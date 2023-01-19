import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { changeQuestionIndex, clearPlayerInfo } from '../redux/actions';

class Feedback extends Component {
  redirect = (path) => {
    const { history } = this.props;
    history.push(path);
  };

  handleClick = () => {
    const { dispatch } = this.props;
    dispatch(changeQuestionIndex(0));
    dispatch(clearPlayerInfo());
    this.redirect('/');
  };

  handleFeedback = () => {
    const { assertions } = this.props;
    const valueMin = 3;
    return assertions < valueMin ? <h3>Could be better...</h3> : <h3>Well Done!</h3>;
  };

  render() {
    const { assertions, score } = this.props;
    return (
      <div data-testid="feedback-text">
        <Header />
        <h3>O seu placar foi:</h3>
        <h1 data-testid="feedback-total-score">{ score }</h1>
        <h3>Você acertou:</h3>
        <h1 data-testid="feedback-total-question">{ assertions }</h1>
        <h3>Questões de um total de 5.</h3>
        { this.handleFeedback() }
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.handleClick }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => { this.redirect('/ranking'); } }
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
  dispatch: PropTypes.func,
}.isRequired;

const mapStateToProps = ({ player }) => ({
  score: player.score,
  assertions: player.assertions,
});

export default connect(mapStateToProps)(Feedback);
