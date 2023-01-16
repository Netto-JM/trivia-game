import {
  FETCH_GAME_STARTED,
  FETCH_GAME_SUCCESSFUL,
  FETCH_GAME_FAILED,
  ANSWER_QUESTION,
} from '../actions';

const INITIAL_STATE = {
  questions: [],
  isFetching: false,
  errorMessage: '',
  score: 0,
  questionIndex: 0,
};

const gameReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case FETCH_GAME_STARTED:
    return { ...state, isFetching: true, errorMessage: '' };
  case FETCH_GAME_SUCCESSFUL:
    return { ...state, isFetching: false, errorMessage: '', questions: payload };
  case FETCH_GAME_FAILED:
    return { ...state, isFetching: false, errorMessage: payload, questions: [] };
  case ANSWER_QUESTION:
    return { ...state, score: state.score + payload, questionIndex: questionIndex + 1 };
  default:
    return state;
  }
};

export default gameReducer;
