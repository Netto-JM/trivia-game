import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Question extends Component {
  state = {
    rightAnswerClasses: 'answer',
    wrongAnswerClasses: 'answer',
    questionTimer: 30,
    questionTimerId: 0,
    disableButton: false,
  };

  componentDidMount() {
    const ONE_SECOND = 1000;
    this.setState({
      questionTimerId: setInterval(this.updateTimer, ONE_SECOND),
    });
  }

  componentWillUnmount() {
    const { questionTimerId } = this.state;
    clearInterval(questionTimerId);
  }

  timeOver = () => {
    const { questionTimerId } = this.state;
    clearInterval(questionTimerId);
    this.setState({
      questionTimer: 0,
      disableButton: true,
    });
  };

  updateTimer = () => {
    const { questionTimer } = this.state;
    if (questionTimer <= 1) return this.timeOver();
    this.setState((prevState) => ({
      questionTimer: prevState.questionTimer - 1,
    }));
  };

  handleClick = () => {
    this.setState({
      rightAnswerClasses: 'answer clicked-right-answer',
      wrongAnswerClasses: 'answer clicked-wrong-answer',
    });
  };

  render() {
    const { question, category, answers, correctAnswer } = this.props;
    const { rightAnswerClasses, wrongAnswerClasses, disableButton } = this.state;

    const options = answers.map((answer, ansIndex) => {
      if (answer === correctAnswer) {
        return (
          <button
            type="button"
            key={ answer + ansIndex }
            data-testid="correct-answer"
            className={ rightAnswerClasses }
            onClick={ this.handleClick }
            disabled={ disableButton }
          >
            {correctAnswer}
          </button>
        );
      }
      return (
        <button
          type="button"
          key={ answer + ansIndex }
          data-testid={ `wrong-answer-${ansIndex}` }
          className={ wrongAnswerClasses }
          onClick={ this.handleClick }
          disabled={ disableButton }
        >
          {answer}
        </button>
      );
    });

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
  correctAnswer: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Question;
