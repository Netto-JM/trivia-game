import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../helpers/renderWithRouterAndRedux';
import Feedback from "../../pages/Feedback";
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../../App';



describe('Testa a tela de Feedback', () => {
  test('Verifica se a div container de Feedback esta na tela', () => {
    const INITIAL_STATE = {
      player: {},
      score: 0,
      assertions: 0,
    };
    renderWithRouterAndRedux(<Feedback {...INITIAL_STATE} />);
    const feedback = screen.getByTestId('feedback-text');
    expect(feedback).toBeInTheDocument();

    const score = screen.getByTestId('feedback-total-score');
    expect(score).toBeInTheDocument();
    expect(+score.innerHTML).toBe(0);

    const assertions = screen.getByTestId('feedback-total-question');
    expect(assertions).toBeInTheDocument();
    expect(+assertions.innerHTML).toBe(0);
  });

  test('Verifica se o placar é exibido', () => {
    const INITIAL_STATE = {
      player: {
        score: 214,
      },
    };
    renderWithRouterAndRedux(<Feedback />, INITIAL_STATE);
    const score = screen.getByTestId('feedback-total-score');
    expect(score).toBeInTheDocument();
  });

  test('Verifica se a quantidade de acertos são exibidas', () => {
    const INITIAL_STATE = {
      player: {
        score: 0,
        assertions: 4,
      },
    };
    renderWithRouterAndRedux(<Feedback />, INITIAL_STATE);
    const assertions = screen.getByTestId('feedback-total-question');
    expect(assertions).toBeInTheDocument();
    expect(+assertions.innerHTML).toBe(4);
  });

  test('Verifica se redireciona para a tela principal', () => {
    const INITIAL_STATE = {
      player: {
        score: 162,
        assertions: 4,
      },
    };

    const { history } = renderWithRouterAndRedux(<Feedback />, INITIAL_STATE, '/');
    const btnPlayAgain = screen.getByTestId('btn-play-again');
    expect(btnPlayAgain).toBeInTheDocument();


    userEvent.click(btnPlayAgain);
    expect(history.location.pathname).toBe('/');
  });

  test('Verifica se redireciona para a tela ranking', () => {
    const INITIAL_STATE = {
      player: {
        score: 162,
        assertions: 4,
      },
    };

    const { history } = renderWithRouterAndRedux(<Feedback />, INITIAL_STATE, '/ranking');
    const btnPlayAgain = screen.getByTestId('btn-ranking');
    expect(btnPlayAgain).toBeInTheDocument();


    userEvent.click(btnPlayAgain);
    expect(history.location.pathname).toBe('/ranking');
  });

});