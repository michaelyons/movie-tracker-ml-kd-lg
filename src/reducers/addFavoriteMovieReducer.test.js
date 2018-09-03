import { addFavoriteMovieReducer } from './addFavoriteMovieReducer'
import { addFavorite } from '../helpers';

describe('addFavoriteMovieReducer', () => {
  it('should return the initial state', () => {
    const expected = []

    const result = addFavoriteMovieReducer(undefined, {})

    expect(result).toEqual(expected)
  })

  it('should return state with a favorite added', () => {
    const mockState = []
    const action = { type: 'ADD_FAVORITE', favorite: {title: 'Mission Impossible'}}
    const expected = [{ title: 'Mission Impossible'}]

    const result = addFavoriteMovieReducer(mockState, action)

    expect(result).toEqual(expected)
  })

  it('should reset favorites', () => {
    const mockState = [{ title: 'Mission Impossible' }]
    const action = { type: 'RESET_FAVORITE', favorite: { data: [] }}
    const expected = []

    const result = addFavoriteMovieReducer(mockState, action)

    expect(result).toEqual(expected)
  })

  it('should delete a favorite', () => {
    const mockState = [{ title: 'Mission Impossible' }, { title: 'Scooby Doo' }]
    const action = { type: 'DELETE_FAVORITE', favorite: { title: 'Mission Impossible' }}
    const expected = [{ title: 'Scooby Doo' }]

    const result = addFavoriteMovieReducer(mockState, action)

    expect(result).toEqual(expected)
  })
})