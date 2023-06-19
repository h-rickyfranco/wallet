export const setEmail = (email) => ({
  type: 'SET_EMAIL',
  payload: email,
});

export const setCurrencies = (currencies) => ({
  type: 'SET_CURRENCIES',
  payload: currencies,
});

export const removeExpense = (expenseId) => ({
  type: 'REMOVE_EXPENSE',
  payload: expenseId,
});

export function fetchCurrencies() {
  return (dispatch) => {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => {
        const currencies = Object.keys(data).filter((key) => key !== 'USDT');
        dispatch(setCurrencies(currencies));
      });
  };
}

export const saveExpense = (expense) => ({
  type: 'SET_EXPENSE',
  payload: expense,
});

export function fetchExchange(expense) {
  return (dispatch) => {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => {
        delete data.USDT;
        expense.exchangeRates = data;
        dispatch(saveExpense(expense));
      });
  };
}
