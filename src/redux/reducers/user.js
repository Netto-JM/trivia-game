const INITIAL_STATE = {
  image: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
  name: 'Turma 22',
  score: 0,
};

const userReducer = (store = INITIAL_STATE, action) => {
  switch (action.type) {
  default:
    return store;
  }
};

export default userReducer;
