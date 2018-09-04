import React from 'react';
import {
  CardsContainer,
  mapStateToProps,
  mapDispatchToProps
} from './CardsContainer';
import { movieCard, addFavorites, deleteFavorites } from '../../actions';

describe('CardsContainer', () => {
  describe('mapStateToProps', () => {
    it.skip('should return a movie Object', () => {
      const mockState = {
        data: [{ name: 'Oceans 8' }],
        favorite: [{ name: 'Oceans 8' }],
        id: 2
      };
      const expected = {
        data: [{ name: 'Oceans 8' }],
        favorite: [{ name: 'Oceans 8' }],
        id: 2
      };

      const mappedProps = mapStateToProps(mockState);

      expect(mappedProps).toEqual(expected);
    });
  });
  describe('mapDispatchToProps', () => {
    it('should call dispatch with a movieCard action when makeCards is called', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = movieCard({ title: 'Oceans 8', id: 233434 });

      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.makeCards({ title: 'Oceans 8', id: 233434 });

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
    it('should call dispatch with a newFavorites object when addFavorites is called', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = addFavorites({
        title: 'Oceans 8',
        id: 334234324
      });

      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.addFavoriteMovie({ title: 'Oceans 8', id: 334234324 });

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
    it('should call dispatch with a favorites object when deleteFavorites is called', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = deleteFavorites({
        title: 'Oceans 8',
        id: 334234324
      });

      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.deleteFavoriteMovie({
        title: 'Oceans 8',
        id: 334234324
      });

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });
});
