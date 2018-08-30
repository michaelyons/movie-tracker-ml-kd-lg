export const displayMovieCardsReducer = (state = [], action) => {
  switch (action.type) {
    case 'DISPLAY-MOVIE-INFO':
      return action.movies;
    default:
      return state;
  }
};
