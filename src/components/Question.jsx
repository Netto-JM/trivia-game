import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Question extends Component {
  render() {
    const { question, category, options } = this.props;
    return (
      <div>
        <h1 data-testid="question-category">{category}</h1>
        <p data-testid="question-text">{question}</p>
        <div data-testid="answer-options">{options}</div>
      </div>
    );
  }
}

Question.propTypes = {
  question: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default Question;
