import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpense } from '../redux/actions';
import './table.css';

class Table extends Component {
  handleDeleteExpense = (expenseId) => {
    const { dispatch } = this.props;
    dispatch(removeExpense(expenseId));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido;</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses.length > 0
                ? expenses.map((expense) => (
                  <tr key={ expense.id }>
                    <td>{expense.description}</td>
                    <td>{expense.tag}</td>
                    <td>{expense.method}</td>
                    <td>{parseFloat(expense.value).toFixed(2)}</td>
                    <td>{expense.exchangeRates[expense.currency].name}</td>
                    <td>
                      {
                        parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2)
                      }

                    </td>
                    <td>
                      {
                        parseFloat(expense.value
                          * expense.exchangeRates[expense.currency].ask).toFixed(2)
                      }

                    </td>
                    <td>Real</td>
                    <td>
                      <button
                        className="bg-red-500 rounded-lg p-2 text-white"
                        type="button"
                        name="excluir"
                        data-testid="delete-btn"
                        onClick={ () => this.handleDeleteExpense(expense.id) }
                      >
                        Excluir
                      </button>

                    </td>
                  </tr>)) : ' '
            }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.wallet,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
