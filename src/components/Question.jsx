import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { answerQuestion, feedbackMessage, changeQuestionIndex } from '../redux/actions';

class Question extends Component {
  state = {
    rightAnswerClasses: 'answer',
    wrongAnswerClasses: 'answer',
    questionTimer: 30,
    questionTimerId: 0,
    disableButton: false,
    showNextButton: false,
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
      showNextButton: true,
    });
  };

  updateTimer = () => {
    const { questionTimer } = this.state;
    if (questionTimer <= 1) return this.timeOver();
    this.setState((prevState) => ({
      questionTimer: prevState.questionTimer - 1,
    }));
  };

  updateScore = () => {
    const { difficulty, dispatch } = this.props;
    const { questionTimer } = this.state;
    const dfcyMtpl = { hard: 3, medium: 2, easy: 1 };
    const TEN_POINTS = 10;
    const questionScore = TEN_POINTS + questionTimer * dfcyMtpl[difficulty];
    dispatch(answerQuestion(questionScore));
  };

  feedbackMsg = () => {
    const { dispatch } = this.props;
    const sum = 1;
    dispatch(feedbackMessage(sum));
  };

  handleClick = ({ target: { name } }) => {
    if (name === 'correctAnswer') this.updateScore();
    if (name === 'correctAnswer') this.feedbackMsg();
    this.setState({
      rightAnswerClasses: 'answer clicked-right-answer',
      wrongAnswerClasses: 'answer clicked-wrong-answer',
      disableButton: true,
      showNextButton: true,
    });
  };

  render() {
    const {
      question,
      category,
      answers,
      correctAnswer,
      dispatch,
      questionIndex,
    } = this.props;
    const {
      rightAnswerClasses,
      wrongAnswerClasses,
      disableButton,
      showNextButton,
      questionTimer,
    } = this.state;

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
        <div>
          { questionTimer }
        </div>
        {showNextButton && (
          <button
            data-testid="btn-next"
            type="button"
            onClick={ () => { dispatch(changeQuestionIndex(questionIndex + 1)); } }
          >
            Next
          </button>
        )}
      </div>
    );
  }
}

Question.propTypes = {
  dispatch: PropTypes.func.isRequired,
  question: PropTypes.string.isRequired,
  questionIndex: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  correctAnswer: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = ({ game: { questionIndex } }) => ({
  questionIndex,
});

export default connect(mapStateToProps)(Question);
