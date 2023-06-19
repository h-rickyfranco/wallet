import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { expenses } = this.props;
    const data = expenses.map((expense) => {
      const firstNumber = Number(parseFloat(expense.value).toFixed(2));
      const multiply = firstNumber * expense.exchangeRates[expense.currency].ask;
      return multiply;
    });
    const sum = data.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const sumFixed = parseFloat(sum).toFixed(2);
    return (
      <div className="">
        <p data-testid="total-field" className="text-xl">
          Total de despesas:
          {' '}
          {sumFixed}
          <span data-testid="header-currency-field">
            BRL
          </span>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const currencyType = PropTypes.shape({
  ask: PropTypes.string.isRequired,
  bid: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  codein: PropTypes.string.isRequired,
  create_date: PropTypes.string.isRequired,
  high: PropTypes.string.isRequired,
  low: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  pctChange: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  varBid: PropTypes.string.isRequired,
});

Header.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({
    currency: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    method: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    exchangeRates: PropTypes.shape({
      ARS: currencyType,
      AUD: currencyType,
      BTC: currencyType,
      CAD: currencyType,
      CHF: currencyType,
      CNY: currencyType,
      DOGE: currencyType,
      ETH: currencyType,
      EUR: currencyType,
      GBP: currencyType,
      ILS: currencyType,
      JPY: currencyType,
      LTC: currencyType,
      USD: currencyType,
      XRP: currencyType,
    }).isRequired,
  })).isRequired,

};

export default connect(mapStateToProps)(Header);
