export const addFavoriteMovieReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      let tempData = state || [];
      console.log(state)
      console.log('TEMP', tempData, action)
      tempData.push(action.favorite);
      return tempData
    case 'POPULATE_FAVORITE':
      return action.favorite.data || [];
    default:
      return state;
  }
};
