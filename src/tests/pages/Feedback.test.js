import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../helpers/renderWithRouterAndRedux';
import Feedback from "../../pages/Feedback";
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../../App';



describe('Testa a tela de Feedback', () => {
  test('Verifica se a div container de Feedback esta na tela', () => {
    const INITIAL_STATE = {
      player: {
        score: 154,
        assertions: 5,
      },
    };
    renderWithRouterAndRedux(<Feedback />, INITIAL_STATE);
    const feedback = screen.getByTestId('feedback-text');
    expect(feedback).toHaveTextContent('Well Done!');

    const score = screen.getByTestId('feedback-total-score');
    expect(score).toBeInTheDocument();
    expect(score).toHaveTextContent(154);

    const assertions = screen.getByTestId('feedback-total-question');
    expect(assertions).toBeInTheDocument();
    expect(assertions).toHaveTextContent(5);
  });

  test('Verifica se o placar é exibido', () => {
    const INITIAL_STATE = {
      player: {
        score: 214,
      },
    };
    renderWithRouterAndRedux(<Feedback />, INITIAL_STATE);
    const score = screen.getByTestId('feedback-total-score');
    expect(score).toHaveTextContent(214);
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
    expect(assertions).toHaveTextContent(4);
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
    const btnRanking = screen.getByTestId('btn-ranking');
    expect(btnRanking).toBeInTheDocument();


    userEvent.click(btnRanking);
    expect(history.location.pathname).toBe('/ranking');
  });

});