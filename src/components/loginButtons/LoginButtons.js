import React, { Component } from 'react';

export class LoginButtons extends Component {
  constructor() {
    super();
    this.state = {
      clicked: null
    };
  }

  render() {
    return (
      <div>
        <button>Login</button>
        <button>Sign Up</button>
      </div>
    );
  }
}
