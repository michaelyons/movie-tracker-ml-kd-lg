export const movieCard = movies => {
  return {
    type: 'DISPLAY-MOVIE-INFO',
    movies
  };
};

export const userLogin = user => {
  return {
    type: 'USER_LOGIN',
    user
  };
};
