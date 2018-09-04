import React from 'react';
import UserLogin from './UserLogin';
import { shallow } from 'enzyme';

describe('UserLogin', () => {
  let wrapper;
  let mockHandleLogin = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<UserLogin handleLogin={mockHandleLogin} />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should reset the input fields after user submits info', async () => {
    wrapper.setState({ email: 'drlag2be@gmail.com', password: 'password' });
    const mockEvent = new Event('event');
    await wrapper.instance().handleSubmit(mockEvent);
    expect(wrapper.state('email')).toEqual('');
    expect(wrapper.state('password')).toEqual('');
  });

  it('should call loginUser when the form is submitted', () => {
    wrapper.find('#user-submit-button').simulate('click');
    expect(mockHandleLogin).toHaveBeenCalled();
  });

  it('should call storeUserLogin when the form is submitted', async () => {
    const mockEvent = new Event('event');
    await wrapper.instance().storeUserLogin(mockEvent);
    expect(mockHandleLogin).toHaveBeenCalled();
  });

  it('should set the state with the names and values', () => {
    const mockData = { target: { name: 'name', value: 'Lee' } };
    wrapper.instance().handleChange(mockData);
    expect(wrapper.state('name')).toEqual('Lee');
  });

  it('should enable the button when there is something in all of the inputs', () => {
    let result = wrapper.instance().validateUserInputForm();
    expect(result).toEqual(false);
    wrapper.setState({ email: 'drlag2be@gmail.com', password: 'password' });
    result = wrapper.instance().validateUserInputForm();
    expect(result).toEqual(true);
  });
});
