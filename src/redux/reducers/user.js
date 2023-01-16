import { SAVE_USER } from '../actions';

const INITIAL_STATE = {
  image: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
  name: '',
};

const userReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case SAVE_USER:
    return { ...state, name: payload };
  default:
    return state;
  }
};

export default userReducer;
