import React from 'react'
import UserLogin from './UserLogin.js'
import { shallow } from 'enzyme'

describe('UserLogin', () => {
  let wrapper
  let mockHandleLogin = jest.fn()
  let mockState = { email: '', password: ''}

  beforeEach(() => {
    wrapper = shallow(<UserLogin handleLogin={mockHandleLogin} />)
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({
        mockState
      })
    }))
  })

  it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot()
  })

  it('should reset the input fields after user submits info', () => {
    wrapper.setState ({email: 'drlag2be@gmail.com', password: 'password'})
    const mockEvent = new Event('event') 
    wrapper.instance().loginUser(mockEvent)
    expect(wrapper.state('email')).toEqual('')
    expect(wrapper.state('password')).toEqual('')
  })

  it('should call loginUser when the form is submitted', () => {
    wrapper.find('#user-submit-button').simulate('click')
    expect(mockHandleLogin).toHaveBeenCalled()
  })

  it('calls fetch with the correct data when adding a new user', () => {
  const expectedFetchBody = {
    method: 'POST',
    body: JSON.stringify({ name: 'Lee', email: 'drlag2be@gmail.com' }),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  wrapper.setState({ name: 'Lee', email: 'drlag2be@gmail.com' })
  wrapper.instance().loginUser(mockEvent)
  expect(window.fetch).toHaveBeenCalledWith('/api/v1/users', expectedFetchBody)
  })

  it('sets an error when the fetch fails', () => {
    window.fetch = jest.fn().mockImplementationOnce(() => (Promise.reject(
        new Error('failed')
      )))
    Promise.resolve(wrapper.instance().loginUser(mockEvent)
      .then(() => {
        wrapper.update()
      })
      .then(() => {
        wrapper.update()
      })
      .then(() => {
        expect(wrapper.state('errorStatus')).toEqual('Email and Password do not match')
      })
    )})

  it('should call storeUserLogin when the form is submitted', async () => {
    const mockEvent = new Event('event') 
    await wrapper.instance().storeUserLogin(mockEvent)
    expect(mockHandleLogin).toHaveBeenCalled()
  })

  it('should set the state with the names and values', () => {
    const mockData = {target: { name: 'name', value: 'Lee' }}
    wrapper.instance().handleInput(mockData)
    expect(wrapper.state('name')).toEqual('Lee')
  }) 

  it('should enable the button when there is something in all of the inputs', () => {
    let result = wrapper.instance().validateUserInputForm()
    expect(result).toEqual(false)
    wrapper.setState({email: 'drlag2be@gmail.com', password: 'password'})
    expect(result).toEqual(true)
  })

  it('should call viewFavoritesPage when view Favorites button is clicked', () => {
    const mockEvent = new Event('event') 
    let result = wrapper.instance().viewFavoritesPage()
    expect(result).toHaveBeenCalled()
  })

  it('should call retrieveUserLogin when the form is submitted', () => {
    const mockEvent = new Event('event') 
    let result = wrapper.instance().retrieveUserLogin()
    expect(result).toHaveBeenCalled()
  })

  it('fetch is called with the correct params', async () => {
    const mockState = {name: 'Oranges', quantity: 3}
    const expectedFetchBody = {
      method: 'POST',
      body: JSON.stringify({ name: 'Lee', email: 'drlag2be@gmail.com' }),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    await loginUser(mockEvent)
    expect(window.fetch).toHaveBeenCalledWith(...expected)
  })
})