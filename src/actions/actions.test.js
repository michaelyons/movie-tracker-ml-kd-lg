import * as actions from '../actions';

describe('actions', () => {
  it('should display movie info', () => {
    const movies = { title: 'Mission Impossible' };
    const expected = {
      type: 'DISPLAY_MOVIE_INFO',
      movies: { title: 'Mission Impossible' }
    };

    const result = actions.movieCard(movies);

    expect(result).toEqual(expected);
  });

  it('should log a user in', () => {
    const user = { id: 3 };
    const expected = {
      type: 'USER_LOGIN',
      user: { id: 3 }
    };

    const result = actions.userLogin(user);

    expect(result).toEqual(expected);
  });

  it('should add a favorite', () => {
    const favorite = { title: 'Mission Impossible' };
    const expected = {
      type: 'ADD_FAVORITE',
      favorite: { title: 'Mission Impossible' }
    };

    const result = actions.addFavorites(favorite);

    expect(result).toEqual(expected);
  });

  it('should reset favorites', () => {
    const favorite = [];
    const expected = {
      type: 'RESET_FAVORITE',
      favorite
    };

    const result = actions.resetFavorites(favorite);

    expect(result).toEqual(expected);
  });

  it('should delete a favorite', () => {
    const favorite = { title: 'Mission Impossible' };
    const expected = {
      type: 'DELETE_FAVORITE',
      favorite
    };

    const result = actions.deleteFavorites(favorite);

    expect(result).toEqual(expected);
  });
});
