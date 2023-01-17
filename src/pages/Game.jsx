import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Question from '../components/Question';
import { fetchGame, INVALID_TOKEN_ERROR, AMOUNT } from '../redux/actions';

import '../styles/Game.css';

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

    const questionsElement = questions.map((element, index) => {
      const {
        category,
        correct_answer: correctAnswer,
        // difficulty,
        incorrect_answers: incorrectAnswers,
        question,
        // type,
      } = element;
      const shuffledAnsweers = shuffle([...incorrectAnswers, correctAnswer]);
      return (
        <Question
          key={ question + index }
          question={ question }
          category={ category }
          answers={ shuffledAnsweers }
          correctAnswer={ correctAnswer }
        />
      );
    });

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
