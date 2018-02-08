import { combineReducers } from 'redux'
import auth from './auth'
import applicants from './applicants'

const recruitmentApp = combineReducers({
	auth,
	applicants,
});

export default recruitmentApp;
