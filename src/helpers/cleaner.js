export const cleanMovies = async (data) => {
  return data.results.map(result => {
    return {
      title: result.title, 
      overview: result.overview, 
      rating: result.vote_average,
      id: (Date.now()*Math.random()).toFixed(0)}
  })
  //maybe need promise.all
}