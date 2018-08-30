export const addFavoriteMovieReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return action.favorite;
    default:
      return state;
  }
};
