import React, { Component } from 'react'
import { newUserFetchCall } from '../../helpers.js'


class UserSignup extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      password: ''
    }
  }

  handleSubmit = async event => {
    event.preventDefault()
    const { name, email, password } = this.state
    const data = await newUserFetchCall(name, email,password)
    console.log(data)
  }
  
  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  } 

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h2>Sign Up</h2>
          <input placeholder='User Name' value={this.state.name} type='text' name='name' onChange={this.handleChange}/>
          <input placeholder='Email' value={this.state.email} type='email' name='email' onChange={this.handleChange}/>
          <input placeholder='Password' value={this.state.password} type='password' name='password' onChange={this.handleChange}/>
          <button>Sign Up</button>
        </form>
        <button>Cancel</button>
      </div>
    )
  }
}

export default UserSignup