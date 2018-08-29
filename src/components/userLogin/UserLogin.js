import React, { Component } from 'react';
// import { loginUser } from '../../helpers'

class UserLogin extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
  }

  loginUser = async (event) => {
    event.preventDefault();
    const { email, password } = this.state
    const response = await fetch('http://localhost:3000/api/users/', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return await response.json()
  }

  handleInput = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  validateUserInputForm = () => {
    return (this.state.email.length > 8 && this.state.password.length > 6)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.loginUser}>
          <input
            type="email"
            placeholder="Enter Email"
            value={this.state.email}
            name='email'
            onChange={this.handleInput}
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={this.state.password}
            name='password'
            onChange={this.handleInput}
          />
          <button disabled={!this.validateUserInputForm()}>Login</button>
        </form>
          <button>Register</button>
      </div>
    );
  }
}

export default UserLogin;
