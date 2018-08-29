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
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default UserLogin;
