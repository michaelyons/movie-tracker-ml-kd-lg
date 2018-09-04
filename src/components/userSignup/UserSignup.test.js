import React from 'react'
import UserSignup from './UserSignup'
import { shallow } from 'enzyme'

describe('UserSignup', () => {
  let wrapper
  let mockHandleSignup = jest.fn()
  let mockState = {name: '', email: '', password: ''}

  beforeEach(() => {
    wrapper = shallow(<UserSignup handleSignup={mockHandleSignup} />)
  })

  
  it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot()
  })

  it('should reset the input fields after user submits info', async () => {
    wrapper.setState ({name: 'kiel', email: 'kiel@gmail.com', password: 'password'})
    const mockEvent = new Event('event') 
    
    await wrapper.instance().handleSubmit(mockEvent)

    expect(wrapper.state('name')).toEqual('')
    expect(wrapper.state('email')).toEqual('')
    expect(wrapper.state('password')).toEqual('')
  })

  it('should call handleSignup when the form is submitted', () => {
    wrapper.find('#user-submit-button').simulate('click')

    expect(mockHandleSignup).toHaveBeenCalled()
  })

  it('should call handleSubmit when the form is submitted', async () => {
    const mockEvent = new Event('event') 

    await wrapper.instance().handleSubmit(mockEvent)

    expect(mockHandleSignup).toHaveBeenCalled()
  })

  it('should set the state with the names and values', () => {
    const mockData = {target: { name: 'name', value: 'Kiel' }}

    wrapper.instance().handleChange(mockData)

    expect(wrapper.state('name')).toEqual('Kiel')
  }) 

  it('should enable the button when there is something in all of the inputs', () => {
    let result = wrapper.instance().validateButton()

    expect(result).toEqual(false)

    wrapper.setState({name: 'kiel', email: 'kiel@kiel', password: 'password'})
    result = wrapper.instance().validateButton()

    expect(result).toEqual(true)
  })
})