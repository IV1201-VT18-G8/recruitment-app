import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS} from '../actions';
import { AUTH_TOKEN_NAME } from '../consts';

let initState = {
	isFetching: false,
	isAuthenticated: localStorage.getItem(AUTH_TOKEN_NAME) ? true : false,
	errorMessage: ''
};

// TODO: Check if token is valid/expired.
const auth = (state = initState, action) => {
	switch (action.type) {
		case LOGIN_REQUEST:
			return Object.assign({}, state, {
				isFetching: action.isFetching,
				isAuthenticated: action.isAuthenticated
			});
		case LOGIN_SUCCESS:
			return Object.assign({}, state, {
				isFetching: action.isFetching,
				isAuthenticated: action.isAuthenticated,
				errorMessage: ''
			});
		case LOGIN_FAILURE:
			return Object.assign({}, state, {
				isFetching: action.isFetching,
				isAuthenticated: action.isAuthenticated,
				errorMessage: action.errorMessage
			});
		case LOGOUT_SUCCESS:
			return Object.assign({}, state, {
				isFetching: action.isFetching,
				isAuthenticated: action.isAuthenticated,
				errorMessage: ''
			});
		default:
			return state;
	}
};

export default auth;
