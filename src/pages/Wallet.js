import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;

    return (
      <div className="WalletMain">
        <h1><Header /></h1>
        <div>
          <p>
            Email:
            {' '}
            <span data-testid="email-field">{email}</span>
          </p>
          <p data-testid="header-currency-field">
            BRL
          </p>
        </div>
        <div id="table">
          <br />
          <Table />
          <div />
          <br />
          <br />
        </div>
        <div className="WalletForm">
          <WalletForm />
        </div>
      </div>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Wallet);
