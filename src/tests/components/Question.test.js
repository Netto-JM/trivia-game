import React from "react";
import { screen } from "@testing-library/react";
import renderWithRouterAndRedux from "../helpers/renderWithRouterAndRedux";
import Question from "../../components/Question";
import userEvent from "@testing-library/user-event";

const initialProps = {
  question: 'A pergunta a ser feita',
  category: 'Categoria da pergunta',
  correctAnswer: 'certa',
  answers: ['errada', 'errada', 'certa', 'errada'],
}

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
    const category = screen.getByTestId('question-category');

    
    expect(category).toBeInTheDocument();
    expect(category.innerHTML).toBe(initialProps.category);
  });

  test('Verifica se as opções da pergunta são exibidas na tela.', () => {
    renderWithRouterAndRedux(<Question {...initialProps} />);

    const rightAnswer = screen.getByTestId('correct-answer');
    const wrongAnswer1 = screen.getByTestId('wrong-answer-0');
    const wrongAnswer2 = screen.getByTestId('wrong-answer-1');
    const wrongAnswer3 = screen.getByTestId('wrong-answer-3');

    expect(wrongAnswer1).toBeInTheDocument();
    expect(wrongAnswer2).toBeInTheDocument();
    expect(wrongAnswer3).toBeInTheDocument();
    expect(rightAnswer).toBeInTheDocument();
  });

  test('Verifica a classe verde é exibida quando clicado na opção correta', () => {
    renderWithRouterAndRedux(<Question {...initialProps} />);
    
    const wrongAnswer1 = screen.getByTestId('wrong-answer-0');
    const wrongAnswer2 = screen.getByTestId('wrong-answer-1');
    const wrongAnswer3 = screen.getByTestId('wrong-answer-3');
    const rightAnswer = screen.getByTestId('correct-answer');
    
    userEvent.click(rightAnswer);

    expect(rightAnswer).toHaveAttribute('class', 'answer clicked-right-answer');
    expect(wrongAnswer1).toHaveAttribute('class', 'answer clicked-wrong-answer');
    expect(wrongAnswer2).toHaveAttribute('class', 'answer clicked-wrong-answer');
    expect(wrongAnswer3).toHaveAttribute('class', 'answer clicked-wrong-answer');
  });

  test('Verifica a classe vermelha é exibida quando clicado na opção incorreta', () => {
    renderWithRouterAndRedux(<Question {...initialProps} />);
    
    const wrongAnswer1 = screen.getByTestId('wrong-answer-0');
    const wrongAnswer2 = screen.getByTestId('wrong-answer-1');
    const wrongAnswer3 = screen.getByTestId('wrong-answer-3');
    const rightAnswer = screen.getByTestId('correct-answer');
    
    userEvent.click(wrongAnswer1);

    expect(rightAnswer).toHaveAttribute('class', 'answer clicked-right-answer');
    expect(wrongAnswer1).toHaveAttribute('class', 'answer clicked-wrong-answer');
    expect(wrongAnswer2).toHaveAttribute('class', 'answer clicked-wrong-answer');
    expect(wrongAnswer3).toHaveAttribute('class', 'answer clicked-wrong-answer');
  });
});
