import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from '../helpers/renderWithRouterAndRedux';
import Question from '../../components/Question';

const initialProps = {
  question: 'A pergunta a ser feita',
  category: 'Categoria da pergunta',
  correctAnswer: 'certa',
  answers: ['errada', 'errada', 'certa', 'errada'],
};

const correctAnswer = 'correct-answer';
const wrong0 = 'wrong-answer-0';
const wrong1 = 'wrong-answer-1';
const wrong3 = 'wrong-answer-3';
const rightClicked = 'answer clicked-right-answer';
const wrongClicked = 'answer clicked-wrong-answer';

describe('Testa o componente Header', () => {
  test('Verifica se o texto da pergunta é exibida na tela', () => {
    renderWithRouterAndRedux(<Question { ...initialProps } />);
    const question = screen.getByTestId('question-text');

    expect(question).toBeInTheDocument();
    expect(question.innerHTML).toBe(initialProps.question);
  });

  test('Verifica se a categoria da pergunta é exibida na tela', () => {
    renderWithRouterAndRedux(<Question { ...initialProps } />);
    const category = screen.getByTestId('question-category');

    expect(category).toBeInTheDocument();
    expect(category.innerHTML).toBe(initialProps.category);
  });

  test('Verifica se exibe a cor verde quando o usuario clica em uma opção certa', () => {
    renderWithRouterAndRedux(<Question { ...initialProps } />);
    const greenColor = screen.getByTestId('question-category');

    expect(greenColor).toBeInTheDocument();
    expect(greenColor.innerHTML).toBe(initialProps.category);
  });

  test('Verifica se as opções da pergunta são exibidas na tela.', () => {
    renderWithRouterAndRedux(<Question { ...initialProps } />);

    const rightAnswer = screen.getByTestId(correctAnswer);
    const wrongAnswer1 = screen.getByTestId(wrong0);
    const wrongAnswer2 = screen.getByTestId(wrong1);
    const wrongAnswer3 = screen.getByTestId(wrong3);

    expect(wrongAnswer1).toBeInTheDocument();
    expect(wrongAnswer2).toBeInTheDocument();
    expect(wrongAnswer3).toBeInTheDocument();
    expect(rightAnswer).toBeInTheDocument();
  });

  test('Verifica a classe verde é exibida quando clicado na opção correta', () => {
    renderWithRouterAndRedux(<Question { ...initialProps } />);

    const wrongAnswer1 = screen.getByTestId(wrong0);
    const wrongAnswer2 = screen.getByTestId(wrong1);
    const wrongAnswer3 = screen.getByTestId(wrong3);
    const rightAnswer = screen.getByTestId(correctAnswer);

    userEvent.click(rightAnswer);

    expect(rightAnswer).toHaveAttribute('class', rightClicked);
    expect(wrongAnswer1).toHaveAttribute('class', wrongClicked);
    expect(wrongAnswer2).toHaveAttribute('class', wrongClicked);
    expect(wrongAnswer3).toHaveAttribute('class', wrongClicked);
  });

  test('Verifica a classe vermelha é exibida quando clicado na opção incorreta', () => {
    renderWithRouterAndRedux(<Question { ...initialProps } />);

    const wrongAnswer1 = screen.getByTestId(wrong0);
    const wrongAnswer2 = screen.getByTestId(wrong1);
    const wrongAnswer3 = screen.getByTestId(wrong3);
    const rightAnswer = screen.getByTestId(correctAnswer);

    userEvent.click(wrongAnswer1);

    expect(rightAnswer).toHaveAttribute('class', rightClicked);
    expect(wrongAnswer1).toHaveAttribute('class', wrongClicked);
    expect(wrongAnswer2).toHaveAttribute('class', wrongClicked);
    expect(wrongAnswer3).toHaveAttribute('class', wrongClicked);
  });
});
