import {
  FETCH_GAME_STARTED,
  FETCH_GAME_SUCCESSFUL,
  FETCH_GAME_FAILED,
  GO_TO_NEXT_QUESTION,
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
  case GO_TO_NEXT_QUESTION:
    return { ...state, questionIndex: state.questionIndex + 1 };
  default:
    return state;
  }
};

export default gameReducer;
