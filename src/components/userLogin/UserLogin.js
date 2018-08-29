import React, { Component } from 'react';

class UserLogin extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
  }

  render() {
    return (
      <div>
        <form action="">
          <input
            type="text"
            placeholder="Enter Email"
            value={this.state.email}
          />
          <input
            type="text"
            placeholder="Enter Password"
            value={this.state.password}
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default UserLogin;
