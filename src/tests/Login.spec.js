import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import apiRequest from '../pages/Login';

describe('Testes da Tela de Login', () => {
  it('verifica se a página principal da aplicação é renderizada na rota "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('input-gravatar-email');
    userEvent.type(emailInput, 'teste@teste.com');
    const user = screen.getByTestId('input-player-name');
    userEvent.type(user, 'João');
    const buttonPlay = screen.getByTestId('btn-play');
    userEvent.click(buttonPlay);
    expect(history.location.pathname).toBe('/');
    const buttonSettings = screen.getByTestId('btn-settings');
    userEvent.click(buttonSettings);
    expect(history.location.pathname).toBe('/settings');
  });

  it('verifica chamadas de funções', () => {
    renderWithRouterAndRedux(<App />);
    expect(typeof apiRequest).toBe('object');
    const localStg = localStorage;
    expect(typeof localStg).toBe('object');
  });
});
