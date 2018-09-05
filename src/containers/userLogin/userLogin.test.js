import React from 'react';
import UserLogin from './UserLogin';
import { shallow } from 'enzyme';

describe('UserLogin', () => {
  let wrapper;
  let mockHandleLogin = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<UserLogin handleLogin={mockHandleLogin} />);
  });

  it.skip('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it.skip('should reset the input fields after user submits info', async () => {
    wrapper.setState({ email: 'drlag2be@gmail.com', password: 'password' });
    const mockEvent = new Event('event');
    await wrapper.instance().loginUser(mockEvent);
    expect(wrapper.state('email')).toEqual('');
    expect(wrapper.state('password')).toEqual('');
  });

  it.skip('should call loginUser when the form is submitted', () => {
    wrapper.find('#user-submit-button').simulate('click');
    expect(mockHandleLogin).toHaveBeenCalled();
  });

  it.skip('should call storeUserLogin when the form is submitted', async () => {
    const mockEvent = new Event('event');
    await wrapper.instance().storeUserLogin(mockEvent);
    expect(mockHandleLogin).toHaveBeenCalled();
  });

  it.skip('should set the state with the names and values', () => {
    const mockData = { target: { name: 'name', value: 'Lee' } };
    wrapper.instance().handleInput(mockData);
    expect(wrapper.state('name')).toEqual('Lee');
  });

  it.skip('should enable the button when there is something in all of the inputs', () => {
    let result = wrapper.instance().validateUserInputForm();
    expect(result).toEqual(false);
    wrapper.setState({ email: 'drlag2be@gmail.com', password: 'password' });
    result = wrapper.instance().validateUserInputForm();
    expect(result).toEqual(true);
  });

  it.skip('should call viewFavoritesPage when view Favorites button is clicked', async () => {
    const mockEvent = new Event('event');
    await wrapper.instance().viewFavoritesPage(mockEvent);
    expect(mockHandleLogin).toHaveBeenCalled();
  });

  it.skip('should call retrieveUserLogin when the form is submitted', async () => {
    const mockEvent = new Event('event');
    await wrapper.instance().retrieveUserLogin(mockEvent);
    expect(mockHandleLogin).toHaveBeenCalled();
  });
});
