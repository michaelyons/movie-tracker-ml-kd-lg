import { key } from './helpers/key';

export const currentMovieCategoryFetch = async currentMovieData => {
  const url = `https://api.themoviedb.org/3/movie/${currentMovieData}?api_key=${key}&language=en-US&page=1/`;
  const response = await fetch(url);
  const movies = await response.json();
  return await cleanMovies(movies);
};

export const cleanMovies = async data => {
  return data.results.map(result => {
    return {
      title: result.title,
      overview: result.overview,
      rating: result.vote_average,
      image: `https://image.tmdb.org/t/p/w200${result.poster_path}`,
      id: result.id,
      date: result.release_date
    };
  });
};

export const viewFavoritesFetchCall = async url => {
  const response = await fetch(url);
  const favoritesData = await response.json();
  return await cleanRefreshedMovies(favoritesData);
};

export const cleanRefreshedMovies = async data => {
  return data.data.map(result => {
    return {
      title: result.title,
      overview: result.overview,
      rating: result.vote_average,
      image: result.poster_path,
      id: result.movie_id,
      date: result.release_date
    };
  });
};

export const newUserFetchCall = async (name, email, password) => {
  const url = 'http://localhost:3000/api/users/new';
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        name,
        password,
        email
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Email has already been used');
    }
  } catch (error) {
    alert(error.message);
  }
};

export const addFavorite = async (
  movie_id,
  user_id,
  title,
  poster_path,
  release_date,
  vote_average,
  overview
) => {
  const url = 'http://localhost:3000/api/users/favorites/new';
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        movie_id,
        user_id,
        title,
        poster_path,
        release_date,
        vote_average,
        overview
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Error');
    }
  } catch (error) {
    alert(error.message);
  }
};

export const deleteFavorite = async (movie_id, user_id) => {
  const url = `http://localhost:3000/api/users/${user_id}/favorites/${movie_id}`;
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      body: JSON.stringify({
        movie_id,
        user_id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Unable to Delete Favorite');
    }
  } catch (error) {
    alert(error.message);
  }
};
