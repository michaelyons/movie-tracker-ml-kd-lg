export const addFavoriteMovieReducer = (state = [], action) => {
  let tempData;
  switch (action.type) {
    case 'ADD_FAVORITE':
      tempData = state || [];
      tempData.push(action.favorite);
      return tempData;
    case 'RESET_FAVORITE':
      return action.favorite.data || [];
    case 'DELETE_FAVORITE':
      tempData = state || [];
      return tempData.filter(movie => {
        return movie.title !== action.favorite.title;
      });
    default:
      return state;
  }
};
