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


})