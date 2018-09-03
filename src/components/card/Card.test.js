import React from 'react';
import { Card } from './Card';
import { shallow } from 'enzyme';

describe('Card', () => {
  let wrapper;
  let mockSaveFavorite = jest.fn();
  let mockEvaluateClass = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <Card saveFavorite={mockSaveFavorite} evaluateClass={mockEvaluateClass} />
    );
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('saveFavorites should be invoked on when favorite button is clicked', () => {
    wrapper.find('button').simulate('click');

    expect(mockSaveFavorite).toHaveBeenCalled();
  });
});
