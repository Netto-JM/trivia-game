import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { answerQuestion } from '../redux/actions';

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

  handleClick = ({ target: { name } }) => {
    const { difficulty, dispatch } = this.props;
    const { questionTimer } = this.state;
    if (name === 'correctAnswer') {
      const dfcyMtpl = { hard: 3, medium: 2, easy: 1 };
      const TEN_POINTS = 10;
      const questionScore = TEN_POINTS + (questionTimer * dfcyMtpl[difficulty]);
      console.log('questionScore', questionScore);
      dispatch(answerQuestion(questionScore));
    }
    this.setState({
      rightAnswerClasses: 'answer clicked-right-answer',
      wrongAnswerClasses: 'answer clicked-wrong-answer',
      disableButton: true,
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
            name="correctAnswer"
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
          name="wrongAnswer"
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
  dispatch: PropTypes.func.isRequired,
  question: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  correctAnswer: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect()(Question);
