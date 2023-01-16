import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Question from '../components/Question';
import { fetchGame, INVALID_TOKEN_ERROR, AMOUNT } from '../redux/actions';

class Game extends Component {
  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchGame());
  }

  render() {
    const { questions, errorMessage, history, questionIndex } = this.props;
    if (errorMessage === INVALID_TOKEN_ERROR) {
      localStorage.removeItem('token');
      history.push('/');
    }

    const nextQuestionAvailable = AMOUNT > questionIndex;

    // função "shuffle" abaixo usa um algoritmo chamado "Fisher-Yates shuffle."

    const shuffle = (array) => {
      const shuffledArray = [...array];
      for (let i = shuffledArray.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
      }
      return shuffledArray;
    };
    console.log('questions', questions);

    const questionsElement = questions.map((element, index) => {
      const {
        category,
        correct_answer: correctAnswer,
        // difficulty,
        incorrect_answers: incorrectAnswers,
        question,
        // type,
      } = element;
      const wrongAnswers = incorrectAnswers.map((answer, ansIndex) => (
        <button
          type="button"
          key={ answer + ansIndex }
          data-testid={ `wrong-answer-${ansIndex}` }
        >
          {answer}
        </button>
      ));
      const rightAnswer = (
        <button
          type="button"
          data-testid="correct-answer"
          onClick={ this.handleColors() }
        >
          {correctAnswer}
        </button>
      );

      const shuffledAnsweers = shuffle([...wrongAnswers, rightAnswer]);
      console.log(shuffledAnsweers);
      console.log('shuffledAnsweers', shuffledAnsweers);
      return (
        <Question
          key={ question + index }
          question={ question }
          category={ category }
          options={ shuffledAnsweers }
        />
      );
    });

    console.log('questions: ', questions);

    return (
      <div>
        <h1>Game</h1>
        {nextQuestionAvailable ? (
          questionsElement[questionIndex]
        ) : (
          <h1>Game Over</h1>
        )}
        <Header />
      </div>
    );
  }
}

const mapStateToProps = ({ game }) => ({
  questions: game.questions,
  errorMessage: game.errorMessage,
  questionIndex: game.questionIndex,
});

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
  questionIndex: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  history: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps)(Game);
