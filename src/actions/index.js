export const movieCard = movies => {
  return {
    type: 'DISPLAY_MOVIE_INFO',
    movies
  };
};

export const userLogin = user => {
  return {
    type: 'USER_LOGIN',
    user
  };
};

export const addFavorites = (favorite) => {
  return {
    type: 'ADD_FAVORITE',
    favorite
  };
};

export const resetFavorites = favorite => {
  return {
    type: 'RESET_FAVORITE',
    favorite
  };
};

export const deleteFavorites = favorite => {
  return {
    type: 'DELETE_FAVORITE',
    favorite
  };
};
