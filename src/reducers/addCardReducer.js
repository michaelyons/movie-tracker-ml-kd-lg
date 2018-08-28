export const addCardReducer = (state = [], action) => {
  switch(action.type) {
    case 'MOVIE_CARD':
      return action.movies
    default:
      return state
  }
}