export const addFavoriteMovieReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return [...state, action.favorite];
    default:
      return state;
  }
};
