import { key } from './key';

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
      id: (Date.now() * Math.random()).toFixed(0)
    };
  });
};

export const newUserFetchCall = async (name, email, password) => {
  const url = 'http://localhost:3000/api/users/new'
  const response = await fetch(
    url,
    { 
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      header: {'Content-Type': 'application/json'} 
    })
    console.log(response)
    const data = await response.json()

    return await data
  }



// export const setMovieData = (currentMovieData) => {
//   let currentMovieType;
//   switch(currentMovieData) {
//     case: ''
//   }
// }
