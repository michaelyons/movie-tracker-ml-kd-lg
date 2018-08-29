const initialState = {
  currentMovies: []
};

export const fetchCurrentMovieCardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOW_PLAYING':
      return {
        ...state
      };
    default:
      return state;
  }
};
