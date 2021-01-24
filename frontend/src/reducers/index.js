import isLoggedReducer from './isLogged';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    logged: isLoggedReducer
})

export default allReducers;
