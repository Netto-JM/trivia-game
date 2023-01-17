import { SAVE_USER, SAVE_USER_IMAGE } from '../actions';

const INITIAL_STATE = {
  image: '',
  name: '',
  email: '',
  fetching: false,
};

const userReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case SAVE_USER:
    return { ...state, ...payload };
  case SAVE_USER_IMAGE:
    return { ...state, image: payload };
  default:
    return state;
  }
};

export default userReducer;
