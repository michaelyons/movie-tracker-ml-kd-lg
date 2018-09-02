import React, { Component } from 'react';
import { newUserFetchCall } from '../../helpers.js';
import { NavLink } from 'react-router-dom';

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
        <form onSubmit={this.handleSubmit}>
          <h2>Sign Up</h2>
          <input
            placeholder="User Name"
            value={this.state.name}
            type="text"
            name="name"
            onChange={this.handleChange}
          />
          <input
            placeholder="Email"
            value={this.state.email}
            type="email"
            name="email"
            onChange={this.handleChange}
          />
          <input
            placeholder="Password"
            value={this.state.password}
            type="password"
            name="password"
            onChange={this.handleChange}
          />
          <NavLink to="/">
          <button>Sign Up</button>
          </NavLink>
        </form>
        <button>Cancel</button>
      </div>
    );
  }
}

export default UserSignup;
