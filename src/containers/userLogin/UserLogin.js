import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userLogin, addFavorites } from '../../actions/index';
import { viewFavoritesFetchCall } from '../../helpers';
import PropTypes from 'prop-types';
import UserSignup from '../../components/userSignup/UserSignup';
import './UserLogin.css';

class UserLogin extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      loggedIn: false,
      signup: false
    };
  }

  loginUser = async event => {
    event.preventDefault();
    const { email, password } = this.state;
    try {
      const response = await fetch('http://localhost:3000/api/users/', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      this.setState({
        email: '',
        password: ''
      });
      const data = await response.json();
      this.storeUserLogin(data.data);
      this.props.loggedInUser(data);
      await this.viewFavoritesPage(data.data.id);
    } catch (error) {
      alert('Email and Password do not match');
    }
  };

  viewFavoritesPage = async user => {
    const url = `http://localhost:3000/api/users/${user}/favorites`;
    const userFavoritesData = await viewFavoritesFetchCall(url);
    userFavoritesData.forEach(data => this.props.populateMovieData(data));
  };

  handleInput = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  validateUserInputForm = () => {
    return this.state.email.length > 0 && this.state.password.length > 6;
  };

  storeUserLogin = object => {
    const user = `currentUser${object.id}`;
    const stringifiedUser = JSON.stringify(object);
    localStorage.setItem(user, stringifiedUser);
    this.retrieveUserLogin(user);
  };

  retrieveUserLogin = string => {
    const retrievedUser = localStorage.getItem(string);
    JSON.parse(retrievedUser);
    this.setState({
      loggedIn: true
    });
  };

  handleSignup = () => {
    const updateSignup = !this.state.signup;
    this.setState({
      signup: updateSignup
    });
  };

  render() {
    return (
      <div className="login-container">
        {!this.state.signup && (
          <form className="login-form" onSubmit={this.loginUser}>
            <h2 className="login-title">Log In</h2>
            <input
              className="login-input"
              type="email"
              placeholder="Enter Email"
              value={this.state.email}
              name="email"
              onChange={this.handleInput}
            />
            <input
              className="login-input"
              type="password"
              placeholder="Enter Password"
              value={this.state.password}
              name="password"
              onChange={this.handleInput}
            />
            <div>
              <button
                className="user-login-button"
                disabled={!this.validateUserInputForm()}
              >
                Login
              </button>
              <button className="user-login-button" onClick={this.handleSignup}>
                Register
              </button>
            </div>
          </form>
        )}
        {this.state.signup && <UserSignup handleSignup={this.handleSignup} />}
      </div>
    );
  }
}

UserLogin.propTypes = {
  loggedInUser: PropTypes.func,
  populateMovieData: PropTypes.func
};

const mapStateToProps = state => ({
  id: state.loginUserReducer
});

const mapDispatchToProps = dispatch => ({
  populateMovieData: favorite => dispatch(addFavorites(favorite)),
  loggedInUser: user => dispatch(userLogin(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserLogin);
