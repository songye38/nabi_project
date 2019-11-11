import { combineReducers } from 'redux';
import updateCommReducer from './updateCommReducer.js';

const allReducers = combineReducers({
  updateCommReducer,
});

export default allReducers;