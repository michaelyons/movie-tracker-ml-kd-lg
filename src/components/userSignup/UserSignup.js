import React, { Component } from 'react';
import { newUserFetchCall } from '../../helpers.js';
import './UserSignup.css'
import PropTypes from 'prop-types';


class UserSignup extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: ''
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { name, email, password } = this.state;
    const data = await newUserFetchCall(name, email, password);
    this.setState({
      name: '',
      email: '',
      password: ''
    });
    this.props.handleSignup()
    return data;
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  validateButton = () => {
    return this.state.email.length > 0 && this.state.password.length > 5 && this.state.name.length > 0;
  };

  render() {
    return (
      <div>
        <form className='submit-form' onSubmit={this.handleSubmit}>
          <h2 className='signup-title'>Sign Up</h2>
          <input
            className='signup-input'
            placeholder="User Name"
            value={this.state.name}
            type="text"
            name="name"
            onChange={this.handleChange}
          />
          <input
            className='signup-input'
            placeholder="Email"
            value={this.state.email}
            type="email"
            name="email"
            onChange={this.handleChange}
          />
          <input
            className='signup-input'
            placeholder="Password: Must be at least 6 characters"
            value={this.state.password}
            type="password"
            name="password"
            onChange={this.handleChange}
          />
          <div>
            <button 
              className='user-submit-button'
              disabled={!this.validateButton()}>Sign Up</button>
            <button id='user-submit-button' className='user-submit-button' onClick={() => this.props.handleSignup()}>Cancel</button>
          </div>
        </form>
      </div>
    );
  }
}

UserSignup.propTypes = {
  loginUser: PropTypes.func,
  handleSignup: PropTypes.func
}

export default UserSignup;
