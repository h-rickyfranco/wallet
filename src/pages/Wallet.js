import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import './Wallet.css';
import image from '../assets/wallet.png';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;

    return (
      <div className="overflow">
        <div className="container">
          <div className="bg-white flex justify-center xablau">
            <h1>
              <img src={ image } alt="wallet" />
              {' '}
              Wallet
            </h1>
            <h1><Header /></h1>
            <p>
              Email:
              {' '}
              <span data-testid="email-field">{email}</span>
            </p>

          </div>
          <div className="bg-slate-400 walletform">
            <WalletForm />
          </div>
          <div id="table">
            <br />
            <Table />
            <div />
            <br />
            <br />
          </div>
          <div className="WalletForm" />
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
