import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS} from '../actions';
import { AUTH_TOKEN_NAME } from '../consts';

let initState = {
	isFetching: false,
	isAuthenticated: localStorage.getItem(AUTH_TOKEN_NAME) ? true : false,
	errorMessage: ''
};

// TODO: Check if token is valid/expired.
const auth = (state = initState, action) => {

	let commonUpdatedState = {
		isFetching: action.isFetching,
		isAuthenticated: localStorage.getItem(AUTH_TOKEN_NAME) ? true : false
	};

	switch (action.type) {
		case LOGIN_REQUEST:
			return Object.assign({}, state, commonUpdatedState, {

			});
		case LOGIN_SUCCESS:
			return Object.assign({}, state, commonUpdatedState, {
				errorMessage: ''
			});
		case LOGIN_FAILURE:
			return Object.assign({}, state, commonUpdatedState, {
				errorMessage: action.errorMessage
			});
		case LOGOUT_SUCCESS:
			return Object.assign({}, state, commonUpdatedState, {
				errorMessage: ''
			});
		default:
			return state;
	}
};

export default auth;
