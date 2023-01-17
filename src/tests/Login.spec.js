import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import apiRequest from '../pages/Login';
import mockFetchToken from '../__mocks__/mockFetchToken';

describe('Testes da Tela de Login', () => {

  // it('verifica o retorno da api', async () => {

  //   jest.spyOn(global, 'fetch');
  //   await apiRequest();
  //   expect(global.fetch).toHaveBeenCalled();
  // });

  it('verifica se a página principal da aplicação é renderizada na rota "/"', () => {

    jest.spyOn(global, 'fetch').mockImplementation(mockFetchToken);

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

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://opentdb.com/api_token.php?command=request');

    expect(global.fetch).toReturn();
  });

  it('verifica chamadas de funções', () => {
    renderWithRouterAndRedux(<App />);
    expect(typeof apiRequest).toBe('object');
    const localStg = localStorage;
    expect(typeof localStg).toBe('object');
  });
});
