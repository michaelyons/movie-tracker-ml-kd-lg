import { combineReducers } from 'redux';
import { displayMovieCardsReducer } from './displayMovieCardsReducer';
import { loginUserReducer } from './loginUserReducer';
import { addFavoriteMovieReducer } from './addFavoriteMovieReducer';

export const rootReducer = combineReducers({
  displayMovieCardsReducer,
  loginUserReducer,
  addFavoriteMovieReducer
});
