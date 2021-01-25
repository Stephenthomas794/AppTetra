import isLoggedReducer from './isLogged';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    isLogged: isLoggedReducer
})

export default allReducers;
