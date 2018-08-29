export const cleanMovies = async data => {
  return data.results.map(result => {
    return {
      title: result.title,
      overview: result.overview,
      rating: result.vote_average,
      image: `https://image.tmdb.org/t/p/w200${result.poster_path}`,
      id: result.id
    };
  });
};
