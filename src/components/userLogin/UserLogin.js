import React, { Component } from 'react';

class UserLogin extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

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
        <form onSubmit={this.handleSubmit}>
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
          <button disabled={!this.validateUserInputForm()}>Submit</button>
        </form>
        <div id='message1'>
          <h3>Email and Password do not match</h3>
        </div>
        <div id='message2'>
          <h3>Email has already been used</h3>
        </div>
      </div>
    );
  }
}

export default UserLogin;
