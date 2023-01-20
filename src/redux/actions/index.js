export const SAVE_PLAYER = 'SAVE_PLAYER';
export const SAVE_PLAYER_IMAGE = 'SAVE_PLAYER_IMAGE';

export const FETCH_GAME_STARTED = 'FETCH_GAME_STARTED';
export const FETCH_GAME_SUCCESSFUL = 'FETCH_GAME_SUCCESSFUL';
export const FETCH_GAME_FAILED = 'FETCH_GAME_FAILED';
export const INVALID_TOKEN_ERROR = 'Invalid Token';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';
export const FEEDBACK_MESSAGE = 'FEEDBACK_MESSAGE';
export const CHANGE_QUESTION_INDEX = 'CHANGE_QUESTION_INDEX';
export const CLEAR_PLAYER_INFO = 'CLEAR_PLAYER_INFO';
export const AMOUNT = 5;

export const clearPlayerInfo = () => ({
  type: CLEAR_PLAYER_INFO,
});

export const savePlayer = (payload) => ({
  type: SAVE_PLAYER,
  payload,
});

export const savePlayerImage = (payload) => ({
  type: SAVE_PLAYER_IMAGE,
  payload,
});

export const answerQuestion = (result) => ({
  type: ANSWER_QUESTION,
  payload: result,
});

export const feedbackMessage = (result) => ({
  type: FEEDBACK_MESSAGE,
  payload: result,
});

export const changeQuestionIndex = (payload) => ({
  type: CHANGE_QUESTION_INDEX,
  payload,
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
