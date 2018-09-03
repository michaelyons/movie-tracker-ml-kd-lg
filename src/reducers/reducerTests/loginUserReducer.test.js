import { loginUserReducer } from '../loginUserReducer';

describe('loginUserReducer', () => {
  it('should return the initial state', () => {
    const expected = {}

    const result = loginUserReducer(undefined, {})

    expect(result).toEqual(expected)
  })

  it('should return the user when logged in', () => {
    const mockState = {}
    const mockAction = { type: 'USER_LOGIN', user: { id: 1, name: 'Kiel', password: 'guest' }}
    const expected = { id: 1, name: 'Kiel', password: 'guest' }

    const result = loginUserReducer(mockState, mockAction)

    expect(result).toEqual(expected)
  })
})