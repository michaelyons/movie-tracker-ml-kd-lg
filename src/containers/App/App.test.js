import React from 'react';
import { App, mapStateToProps, mapDispatchToProps } from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from '../../reducers/index';
import { movieCard, userLogin, resetFavorites } from '../../actions';

describe('App', () => {
  let wrapper;
  let mockStore = createStore(rootReducer);

  it('should match the snapshot', () => {
    wrapper = (
      <Provider store={mockStore}>
        <App />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  describe('mapStateToProps', () => {
    it('should return a loggedInUser Object', () => {
      const mockState = {
        loggedInUser: [
          { name: 'Tom', email: 'tom@gmail.com', password: 'password' }
        ],
        user: 'USER_LOGIN'
      };
      const expected = {
        loggedInUser: [
          { email: 'tom@gmail.com', name: 'Tom', password: 'password' }
        ],
        user: 'USER_LOGIN'
      };

      const mappedProps = mapStateToProps(mockState);

      expect(mappedProps.loggedInUser).toEqual(expected);
    });
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch with a movieCard Action when makeCards is called', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = movieCard({ title: 'Ocean 8', id: 232423 });

      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.makeCards({ title: 'Ocean 8', id: 232423 });

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
    it('should call dispatch with a logOutUser Action when userLogin is called', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = userLogin({});

      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.logOutUser({});

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
    it('should call dispatch with a clearFavorites Action when resetFavorites is called', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = resetFavorites([]);

      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.clearFavorites([]);

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });
});
