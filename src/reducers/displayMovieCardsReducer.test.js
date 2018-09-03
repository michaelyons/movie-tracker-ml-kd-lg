import { displayMovieCardsReducer } from './displayMovieCardsReducer'

describe('displayMovieCardsReducer', () => {
  it('should return the initial state', () => {
    const expected = []

    const result = displayMovieCardsReducer(undefined, {})

    expect(result).toEqual(expected)
  })

  it('should return the movies given', () => {
    const mockState = []
    const mockAction = { type: 'DISPLAY_MOVIE_INFO',  movies: [{ title: 'Mission Impossible' }]}
    const expected = [{ title: 'Mission Impossible' }]

    const result = displayMovieCardsReducer(mockState, mockAction)

    expect(result).toEqual(expected)
  })
})