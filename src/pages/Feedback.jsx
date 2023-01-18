import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { assertions, score } = this.props;
    const valueMin = 3;
    const handleFeedback = () => (
      assertions < valueMin ? <h3>Could be better...</h3> : <h3>Well Done!</h3>
    );

    return (
      <div data-testid="feedback-text">
        <Header />
        <h3>O seu placar foi:</h3>
        <h1 data-testid="feedback-total-score">{ score }</h1>
        <h3>Você acertou:</h3>
        <h1 data-testid="feedback-total-question">{ assertions }</h1>
        <h3>Questões de um total de 5.</h3>
        {handleFeedback()}
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = ({ player }) => ({
  player,
  score: player.score,
  assertions: player.assertions,
});

export default connect(mapStateToProps)(Feedback);
