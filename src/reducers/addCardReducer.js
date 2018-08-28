export const addCardReducer = (state = [], action) => {
  switch(action.type) {
    case 'MOVIE_CARD':
      return [...state, {title: action.title, overview: action.overview, rating: action.rating, id: action.id}]
    default:
      return state
  }
}