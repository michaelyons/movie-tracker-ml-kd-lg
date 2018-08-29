import { cleanMovies } from './cleaner';
import { key } from './key.js';

export const firstFetch = async currentMovieData => {
  const url = `https://api.themoviedb.org/3/movie/${currentMovieData}?api_key=${key}&language=en-US&page=1/`;
  const response = await fetch(url);
  const movies = await response.json();
  return await cleanMovies(movies);
};
