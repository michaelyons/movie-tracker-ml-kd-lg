import React from 'react'
import UserLogin from './UserLogin'
import { shallow } from 'enzyme'

describe('UserLogin', () => {
  let wrapper
  let mockHandleLogin = jest.fn()
  let mockState = { email: '', password: ''}

  beforeEach(() => {
    wrapper = shallow(<UserLogin handleLogin={mockHandleLogin} />)
  })

  it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot()
  })

  it('should reset the input fields after user submits info', async () => {
    wrapper.setState ({email: 'drlag2be@gmail.com', password: 'password'})
    const mockEvent = new Event('event') 
    
    await wrapper.instance().handleSubmit(mockEvent)

    expect(wrapper.state('email')).toEqual('')
    expect(wrapper.state('password')).toEqual('')
  })


})