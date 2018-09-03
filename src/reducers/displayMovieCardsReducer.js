export const displayMovieCardsReducer = (state = [], action) => {
  switch (action.type) {
    case 'DISPLAY_MOVIE_INFO':
      return action.movies;
    default:
      return state;
  }
};
