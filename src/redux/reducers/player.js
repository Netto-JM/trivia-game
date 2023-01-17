import {
  SAVE_PLAYER,
  SAVE_PLAYER_IMAGE,
  ANSWER_QUESTION,
} from '../actions';

const INITIAL_STATE = {
  image: '',
  name: '',
  email: '',
  fetching: false,
  score: 0,
};

const playerReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case SAVE_PLAYER:
    return { ...state, ...payload };
  case SAVE_PLAYER_IMAGE:
    return { ...state, image: payload };
  case ANSWER_QUESTION:
    return { ...state, score: state.score + payload };
  default:
    return state;
  }
};

export default playerReducer;
