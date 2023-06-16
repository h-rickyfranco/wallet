import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';
// import store from '../redux/store';

describe('Testes da Tabela de gastos', () => {
  it('Testa se os elementos do formulário são renderizados', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/carteira');
    });

    const addExpenseButton = screen.getByRole('button', { name: /adicionar despesa/i });
    const valueInput = screen.getByLabelText('Value');
    const descriptionInput = screen.getByLabelText('Description');
    const currencyInput = screen.getByLabelText('Currency');
    const methodInput = screen.getByLabelText('Method');
    const tagInput = screen.getByLabelText('Tag');

    expect(addExpenseButton).toBeInTheDocument();
    expect(valueInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
  });
  it.only('Testa a inserção e edição de uma despesa na tabela', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push('/carteira');
    });

    await waitFor(() => {
      expect(screen.getByLabelText('Currency')).toHaveTextContent('USD');
    });

    const addExpenseButton = screen.getByRole('button', { name: /adicionar despesa/i });
    const valueInput = screen.getByLabelText('Value');
    const descriptionInput = screen.getByLabelText('Description');
    const currencyInput = await screen.findByLabelText('Currency');
    const methodInput = screen.getByLabelText('Method');
    const tagInput = screen.getByLabelText('Tag');

    act(() => {
      userEvent.type(valueInput, '10');
      userEvent.type(descriptionInput, 'Description');
      userEvent.selectOptions(currencyInput, 'CAD');
      userEvent.selectOptions(methodInput, 'Dinheiro');
      userEvent.selectOptions(tagInput, 'Alimentação');
    });

    expect(screen.getByRole('option', { name: 'CAD' }).selected).toBe(true);
    expect(screen.getByRole('option', { name: 'Dinheiro' }).selected).toBe(true);
    expect(screen.getByRole('option', { name: 'Alimentação' }).selected).toBe(true);

    act(() => {
      userEvent.click(addExpenseButton);
    });

    // ------ Editando despesas

    const editExpenseButton = await screen.findByTestId('edit-btn');
    act(() => {
      userEvent.click(editExpenseButton);
    });
    expect(editExpenseButton).toBeInTheDocument();

    act(() => {
      userEvent.type(valueInput, '20');
      userEvent.type(descriptionInput, 'Descrição2');
      userEvent.selectOptions(currencyInput, 'ARS');
      userEvent.selectOptions(methodInput, 'Cartão de crédito');
      userEvent.selectOptions(tagInput, 'Lazer');
    });

    expect(screen.getByRole('option', { name: 'ARS' }).selected).toBe(true);
    expect(screen.getByRole('option', { name: 'Cartão de crédito' }).selected).toBe(true);
    expect(screen.getByRole('option', { name: 'Lazer' }).selected).toBe(true);

    const saveEditExpenseButton = await screen.findByRole('button', { name: /editar despesa/i });
    act(() => {
      userEvent.click(saveEditExpenseButton);
    });

    //  ------------- Deletando despesas

    const deleteExpenseButton = await screen.findByTestId('delete-btn');
    act(() => {
      userEvent.click(deleteExpenseButton);
    });

    screen.debug();
  });
});
