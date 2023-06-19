import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, fetchExchange } from '../redux/actions';

class WalletForm extends React.Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    // exchangeRates: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    const { value, description, currency, method, tag, id } = this.state;
    parseFloat(value).toFixed(2);
    const expenses = { id, value, description, currency, method, tag };

    dispatch(fetchExchange(expenses));
    const newkey = id + 1;
    this.setState({
      id: newkey,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;

    return (
      <div>
        <form className="walletForm">
          <label htmlFor="value-input">
            Valor:
            <input
              label="value"
              name="value"
              type="number"
              id="value-input"
              data-testid="value-input"
              onChange={ this.handleChange }
              value={ value }
            />
          </label>
          <label htmlFor="description-input">
            Descrição:
            <input
              label="Description"
              value={ description }
              name="description"
              type="text"
              id="description-input"
              data-testid="description-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency-input">
            Moeda:
            <select
              label="Currency"
              value={ currency }
              onChange={ this.handleChange }
              name="currency"
              id="currency-input"
              data-testid="currency-input"
            >
              {currencies.map((currencie) => (
                <option key={ currencie } value={ currencie }>
                  {currencie}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="method-input">
            Método de Pagamento:
            <select
              label="Method"
              value={ method }
              onChange={ this.handleChange }
              name="method"
              id="method-input"
              data-testid="method-input"
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            Categoria:
            <select
              label="Tag"
              value={ tag }
              onChange={ this.handleChange }
              name="tag"
              id="tag-input"
              data-testid="tag-input"
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button
            className="bg-green-500 btn font-serif font-bold text-white p-2 rounded"
            onClick={ this.handleSubmit }
          >
            Adicionar despesa

          </button>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
