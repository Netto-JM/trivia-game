import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Question from '../components/Question';
import { fetchGame, INVALID_TOKEN_ERROR, AMOUNT } from '../redux/actions';

import '../styles/Game.css';

class Game extends Component {
  state = {
    questionsElement: [],
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    await dispatch(fetchGame());
    this.mountQuestions();
  }

  // método "shuffle" abaixo usa um algoritmo chamado "Fisher-Yates shuffle."

  shuffle = (array) => {
    console.log('shuffledy');
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  savePlayerInfo = (playerInfo) => {
    console.log(playerInfo);
  };

  mountQuestions = () => {
    const { questions } = this.props;
    const questionsElement = questions.map((element, index) => {
      const {
        category,
        correct_answer: correctAnswer,
        difficulty,
        incorrect_answers: incorrectAnswers,
        question,
        // type,
      } = element;
      const shuffledAnsweers = this.shuffle([...incorrectAnswers, correctAnswer]);
      return (
        <Question
          key={ question + index }
          question={ question }
          category={ category }
          answers={ shuffledAnsweers }
          correctAnswer={ correctAnswer }
          difficulty={ difficulty }
        />
      );
    });
    this.setState({ questionsElement });
  };

  render() {
    const { errorMessage, history, questionIndex } = this.props;
    const { questionsElement } = this.state;
    if (errorMessage === INVALID_TOKEN_ERROR) {
      localStorage.removeItem('token');
      history.push('/');
    }

    const nextQuestionAvailable = AMOUNT > questionIndex;

    if (!nextQuestionAvailable) {
      this.savePlayerInfo(playerInfo);
      history.push('/feedback');
    }

    return (
      <div>
        <h1>Game</h1>
        <Header />
        {questionsElement[questionIndex]}
      </div>
    );
  }
}

const mapStateToProps = ({ game, player: { name, image, score } }) => ({
  questions: game.questions,
  errorMessage: game.errorMessage,
  questionIndex: game.questionIndex,
  playerInfo: { name, image, score },
});

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
  questionIndex: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  history: PropTypes.shape().isRequired,
  playerInfo: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    score: PropTypes.number,
  }).isRequired,
};

export default connect(mapStateToProps)(Game);
