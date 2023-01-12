import React from "react";
import { screen } from "@testing-library/react";
import renderWithRouterAndRedux from "../helpers/renderWithRouterAndRedux";
import Header from '../../components/Header';

const initialState = {
  user: {
    image: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
    name: 'Nome do usuario',
    score: 0,
  }
}

describe('Testa o componente Header', () => {
  test('Verifica se o se o nome da pessoa está presente no header', () => {
    renderWithRouterAndRedux(<Header />, initialState);
    const username = screen.getByTestId('header-player-name');

    expect(username).toBeInTheDocument();
    expect(username.innerHTML).toBe('Nome do usuario');
  });

  test('Verifica se a imagem do Gravatar está presente no header', () => {
    renderWithRouterAndRedux(<Header />, initialState);
    const gravatar = screen.getByTestId('header-profile-picture');

    expect(gravatar).toBeInTheDocument();
    expect(gravatar).toHaveAttribute('src', 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50');
    expect(gravatar).toHaveAttribute('alt', 'Nome do usuario');
  });

  test('Verifica se o placar zerado está presente no header', () => {
    renderWithRouterAndRedux(<Header />, initialState);
    const score = screen.getByTestId('header-score');

    expect(score).toBeInTheDocument();
    expect(score.innerHTML).toBe('0');
  });
});
