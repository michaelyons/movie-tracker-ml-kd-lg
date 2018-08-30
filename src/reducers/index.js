import { combineReducers } from 'redux';
import { displayMovieCardsReducer } from './displayMovieCardsReducer';
import { loginUserReducer } from './loginUserReducer';

export const rootReducer = combineReducers({
  displayMovieCardsReducer,
  loginUserReducer
});
