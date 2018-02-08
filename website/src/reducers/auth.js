import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS} from '../actions';

let initState = {
	isFetching: false,
	isAuthenticated: localStorage.getItem('id_token') ? true : false
};

// TODO: Check if token is valid/expired.
const auth = (state = initState, action) => {
	switch (action.type) {
		case LOGIN_REQUEST:
			return Object.assign({}, state, {
				isFetching: action.isFetching,
				isAuthenticated: action.isAuthenticated,
				credentials: action.credentials
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
				errorMessage: action.message
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
