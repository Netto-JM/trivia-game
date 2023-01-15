export const SAVE_USER = 'SAVE_USER';
export const FETCH_GAME_STARTED = 'FETCH_GAME_STARTED';
export const FETCH_GAME_SUCCESSFUL = 'FETCH_GAME_SUCCESSFUL';
export const FETCH_GAME_FAILED = 'FETCH_GAME_FAILED';
export const INVALID_TOKEN_ERROR = 'Invalid Token';
const AMOUNT = 5;

export const saveUser = (userName) => ({
  type: SAVE_USER,
  payload: userName,
});

const fetchGameStarted = () => ({
  type: FETCH_GAME_STARTED,
});

const fetchGameSuccessful = (questions) => ({
  type: FETCH_GAME_SUCCESSFUL,
  payload: questions,
});

const fetchGameFailed = (errorMessage) => ({
  type: FETCH_GAME_FAILED,
  payload: errorMessage,
});

const fetchQuestions = async () => {
  const TOKEN = localStorage.getItem('token');
  const ENDPOINT = `https://opentdb.com/api.php?amount=${AMOUNT}&token=${TOKEN}`;
  const response = await fetch(ENDPOINT);
  const data = await response.json();
  const questions = data.results;
  return questions;
};

export const fetchGame = () => async (dispatch) => {
  dispatch(fetchGameStarted());
  const questions = await fetchQuestions();
  if (questions.length === AMOUNT) dispatch(fetchGameSuccessful(questions));
  else dispatch(fetchGameFailed(INVALID_TOKEN_ERROR));
};
