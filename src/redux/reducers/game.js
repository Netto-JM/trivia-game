import {
  FETCH_GAME_STARTED,
  FETCH_GAME_SUCCESSFUL,
  FETCH_GAME_FAILED,
  CHANGE_QUESTION_INDEX,
} from '../actions';

const INITIAL_STATE = {
  questions: [],
  isFetching: false,
  errorMessage: '',
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
  case CHANGE_QUESTION_INDEX:
    return { ...state, questionIndex: payload };
  default:
    return state;
  }
};

export default gameReducer;
