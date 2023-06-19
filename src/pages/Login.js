import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setEmail } from '../redux/actions';
import './Login.css';
import image from '../assets/wallet.png';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  // Função para alterar os valores dos inputs e guardar no State local
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  // Função botão submit
  handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(setEmail(email));
    history.push('/carteira');
  };

  // Verifica se o email está em um formato válido
  isEmailValid = () => {
    const { email } = this.state;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Verifica se a senha possui 6 ou mais caracteres
  isPasswordValid = () => {
    const magicNumber = 6;
    const { password } = this.state;
    return password.length >= magicNumber;
  };

  render() {
    const { email, password } = this.state;
    const isFormValid = this.isEmailValid(email) && this.isPasswordValid(password);

    return (
      <section className="overlay">
        <div className="container">
          <h1>
            <img src={ image } alt="wallet" />
            {' '}
            Wallet
          </h1>
          <form className="login-form">
            <input
              className="input"
              name="email"
              type="email"
              placeholder="Email"
              data-testid="email-input"
              value={ email }
              onChange={ this.handleChange }
            />
            <br />
            <input
              className="input"
              name="password"
              type="password"
              placeholder="Password"
              data-testid="password-input"
              value={ password }
              onChange={ this.handleChange }
            />
            <br />
            <button
              className="submit-button"
              type="submit"
              disabled={ !isFormValid }
              onClick={ this.handleSubmit }
            >
              Entrar
            </button>
          </form>
        </div>
      </section>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
