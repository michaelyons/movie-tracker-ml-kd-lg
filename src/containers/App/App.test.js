import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from '../../reducers/index';

describe('App', () => {
  let wrapper;
  const mockStore = createStore(rootReducer);

  beforeEach(() => {
    wrapper = (
      <Provider store={mockStore}>
        <App />
      </Provider>
    );
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
