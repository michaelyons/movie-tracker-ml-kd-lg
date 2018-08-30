export const fetchCurrentMovieCardsReducer = (state = [], action) => {
  switch (action.type) {
    case 'NOW_PLAYING':
      return {
        ...state
      };
    default:
      return state;
  }
};
