import {
  currentMovieCategoryFetch,
  cleanMovies,
  viewFavoritesFetchCall,
  cleanRefreshedMovies,
  newUserFetchCall,
  addFavorite,
  deleteFavorite
} from './helpers';

describe('helpers file', () => {
  let mockResponse;
  let mockMovie;
  describe('currentMovieCategoryFetch', () => {
    beforeEach(() => {
      mockResponse = {
        results: [
          {
            adult: false,
            backdrop_path: '/scQf03Fm3jeyv4FH04qvi4fp4wh.jpg',
            genre_ids: (4)[(80, 35, 28, 53)],
            id: 402900,
            original_language: 'en',
            original_title: "Ocean's Eight",
            overview:
              "Debbie Ocean, a criminal mastermind, gathers a crew of female thieves to pull off the heist of the century at New York's annual Met Gala.",
            popularity: 146.1,
            poster_path: '/MvYpKlpFukTivnlBhizGbkAe3v.jpg',
            release_date: '2018-06-07',
            title: "Ocean's Eight",
            video: false,
            vote_average: 7,
            vote_count: 1334
          }
        ]
      };
      mockMovie = [
        {
          title: "Ocean's Eight",
          overview:
            "Debbie Ocean, a criminal mastermind, gathers a crew of female thieves to pull off the heist of the century at New York's annual Met Gala.",
          rating: 7,
          image: `https://image.tmdb.org/t/p/w200/MvYpKlpFukTivnlBhizGbkAe3v.jpg`,
          id: 402900,
          date: '2018-06-07'
        }
      ];
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockResponse)
        })
      );
    });

    it('should make a fetch call with the correct params', () => {
      currentMovieCategoryFetch();
      expect(window.fetch).toHaveBeenCalledWith(
        'https://api.themoviedb.org/3/movie/undefined?api_key=d15072c374e94cd4f9167d5083a90eae&language=en-US&page=1/'
      );
    });

    it('should return an object if the response is ok', async () => {
      const expected = mockMovie;
      const result = await currentMovieCategoryFetch();
      expect(result).toEqual(expected);
    });

    it('should throw and error if the fetch fails', async () => {
      const expected = new Error('failed to fetch');
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject(new Error('failed to fetch'));
      });

      await expect(currentMovieCategoryFetch(mockResponse)).rejects.toEqual(
        expected
      );
    });
  });

  describe('cleanMovies', () => {
    it('should return a film object with proper keys and values', () => {
      mockResponse = {
        results: [
          {
            adult: false,
            backdrop_path: '/scQf03Fm3jeyv4FH04qvi4fp4wh.jpg',
            genre_ids: undefined,
            id: 402900,
            original_language: 'en',
            original_title: "Ocean's Eight",
            overview:
              "Debbie Ocean, a criminal mastermind, gathers a crew of female thieves to pull off the heist of the century at New York's annual Met Gala.",
            popularity: 146.1,
            poster_path: '/MvYpKlpFukTivnlBhizGbkAe3v.jpg',
            release_date: '2018-06-07',
            title: "Ocean's Eight",
            video: false,
            vote_average: 7,
            vote_count: 1334
          }
        ]
      };
      cleanMovies(mockResponse).then(res => {
        expect(res[0].id).toEqual(402900);
      });
    });
  });
  describe('newUserFetchCall', () => {
    it('should fetch data with the correct params', () => {
      const mockResults = {
        status: 'success',
        message: 'New user created',
        id: 20
      };
      const randUser = {
        password: 'password',
        name: 'Taylor',
        email: 'tman2272@aol.com'
      };
      window.fetch = jest.fn().mockImplementation(() => {
        Promise.resolve({
          json: () => Promise.resolve(mockResults)
        });
      });
      const expectedResult = [
        'http://localhost:3000/api/users/new',
        {
          body:
            '{"name":"Taylor","password":"tman2272@aol.com","email":"password"}',
          headers: { 'Content-Type': 'application/json' },
          method: 'POST'
        }
      ];
      newUserFetchCall(randUser.name, randUser.password, randUser.email);
      expect(window.fetch).toHaveBeenCalledWith(...expectedResult);
    });
  });

  describe('addFavorite Fetch Call', () => {
    it('should add a favorite with correct data', () => {
      const response = {
        status: 'success',
        message: 'Movie was added to favorites',
        id: 116
      };
      const expectedFetchResult = [
        'http://localhost:3000/api/users/favorites/new',
        {
          body:
            '{"movie_id":{"status":"success","message":"Movie was added to favorites","id":116},"user_id":{"password":"password","name":"Taylor","email":"tman2272@aol.com"}}',
          headers: { 'Content-Type': 'application/json' },
          method: 'POST'
        }
      ];
      window.fetch = jest.fn().mockImplementation(() => {
        Promise.resolve({
          json: () => Promise.resolve(response)
        });
      });
      const randUser = {
        password: 'password',
        name: 'Taylor',
        email: 'tman2272@aol.com'
      };

      addFavorite(response, randUser);
      expect(window.fetch).toHaveBeenCalledWith(...expectedFetchResult);
    });
  });

  describe('deleteFavorite', () => {
    it('should fetch with the correct params', () => {
      const response = { status: 'success', message: '1 row was deleted.' };
      mockMovie = [
        {
          title: "Ocean's Eight",
          overview:
            "Debbie Ocean, a criminal mastermind, gathers a crew of female thieves to pull off the heist of the century at New York's annual Met Gala.",
          rating: 7,
          image: `https://image.tmdb.org/t/p/w200/MvYpKlpFukTivnlBhizGbkAe3v.jpg`,
          id: 402900,
          date: '2018-06-07'
        }
      ];
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(response)
        })
      );
      const expectedResult = [
        'http://localhost:3000/api/users/1/favorites/402900',
        {
          body: '{"movie_id":402900,"user_id":1}',
          headers: { 'Content-Type': 'application/json' },
          method: 'DELETE'
        }
      ];
      deleteFavorite(402900, 1);
      expect(window.fetch).toHaveBeenCalledWith(...expectedResult);
    });
  });
});
