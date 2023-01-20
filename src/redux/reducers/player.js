import {
  SAVE_PLAYER,
  SAVE_PLAYER_IMAGE,
  ANSWER_QUESTION,
  FEEDBACK_MESSAGE,
  CLEAR_PLAYER_INFO,
} from '../actions';

const INITIAL_STATE = {
  image: '',
  name: '',
  email: '',
  fetching: false,
  score: 0,
  assertions: 0,
};

const playerReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case SAVE_PLAYER:
    return { ...state, ...payload };
  case SAVE_PLAYER_IMAGE:
    return { ...state, image: payload };
  case ANSWER_QUESTION:
    return { ...state, score: state.score + payload };
  case FEEDBACK_MESSAGE:
    return { ...state, assertions: state.assertions + payload };
  case CLEAR_PLAYER_INFO:
    return INITIAL_STATE;
  default:
    return state;
  }
};

export default playerReducer;
