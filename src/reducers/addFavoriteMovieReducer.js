export const addFavoriteMovieReducer = (state = [], action) => {
  let tempData;
  switch (action.type) {
    case 'ADD_FAVORITE':
      state.push(action.favorite);
      return state;
    case 'RESET_FAVORITE':
      return [];
    case 'DELETE_FAVORITE':
      return state.filter(movie => {
        return movie.title !== action.favorite.title;
      });
    default:
      return state;
  }
};
