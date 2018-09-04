import React from 'react';
import { App } from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from '../../reducers/index';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router';

describe('App', () => {
  let wrapper;
  let mockStore = createStore(rootReducer);

  it('should match the snapshot', () => {
    wrapper = (
      <Provider store={mockStore}>
        <App />
      </Provider>
    );
  });
  expect(wrapper).toMatchSnapshot();
});
