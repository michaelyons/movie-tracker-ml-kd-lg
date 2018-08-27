export const addCardReducer = (state = [], action) => {
  switch(action.type) {
    case 'MOVIE_CARD':
      return [...state, {title: action.title, overview: action.overview, id: action.id}]
    default:
      return state
  }
}