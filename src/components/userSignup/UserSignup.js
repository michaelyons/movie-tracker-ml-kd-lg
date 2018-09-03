import React, { Component } from 'react';
import { newUserFetchCall } from '../../helpers.js';
import './UserSignup.css'

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
            placeholder="Password"
            value={this.state.password}
            type="password"
            name="password"
            onChange={this.handleChange}
          />
          <div>
            <button className='user-submit-button'>Sign Up</button>
            <button className='user-submit-button' onClick={() => this.props.handleSignup()}>Cancel</button>
          </div>
        </form>
      </div>
    );
  }
}

export default UserSignup;
