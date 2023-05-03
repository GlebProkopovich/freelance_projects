import { isModalOpenedReducer } from './isModalOpened';
import { combineReducers } from 'redux';

export const reducers = combineReducers({
  modal: isModalOpenedReducer,
});
