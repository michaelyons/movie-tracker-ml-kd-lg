import { combineReducers } from 'redux'
import { addCardReducer } from './addCardReducer'

export const rootReducer = combineReducers({
  cards: addCardReducer
})