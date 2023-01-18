import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { rightAnswer } = this.props;
    const valueMin = 3;
    const handleFeedback = () => (
      rightAnswer < valueMin ? <p>Could be better...</p> : <p>Well Done!</p>
    );

    return (
      <div data-testid="feedback-text">
        <Header />
        {handleFeedback()}
      </div>
    );
  }
}

Feedback.propTypes = {
  rightAnswer: PropTypes.number.isRequired,
};

const mapStateToProps = ({ player }) => ({
  player,
  rightAnswer: player.rightAnswer,
});

export default connect(mapStateToProps)(Feedback);
