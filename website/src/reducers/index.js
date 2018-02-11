import { combineReducers } from 'redux'
import { AUTH_TOKEN_NAME } from '../consts';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const APPLICANTS_FETCH_REQUEST = 'APPLICANTS_FETCH_REQUEST';
export const APPLICANTS_FETCH_SUCCESS = 'APPLICANTS_FETCH_SUCCESS';
export const APPLICANTS_FETCH_FAILURE = 'APPLICANTS_FETCH_FAILURE';

let initState = {
	isFetchingAuth: false,
	isAuthenticated: localStorage.getItem(AUTH_TOKEN_NAME) ? true : false,
	loginErrors: {},
	isFetchingApplicants: false,
	applicantsFetchErrors: {},
	applicants: []
};

const recruitmentApp = (state = initState, action) => {
	let commonUpdatedState = {
		isAuthenticated: localStorage.getItem(AUTH_TOKEN_NAME) ? true : false
	};

	switch (action.type) {
		case LOGIN_REQUEST:
			return Object.assign({}, state, commonUpdatedState, {
				isFetchingAuth: true
			});
		case LOGIN_SUCCESS:
			return Object.assign({}, state, commonUpdatedState, {
				isFetchingAuth: false,
				loginErrors: {}
			});
		case LOGIN_FAILURE:
			return Object.assign({}, state, commonUpdatedState, {
				isFetchingAuth: false,
				loginErrors: action.loginErrors
			});
		case LOGOUT_SUCCESS:
			return Object.assign({}, state, commonUpdatedState, {
				loginErrors: {},
				applicants: []
			});
		case APPLICANTS_FETCH_REQUEST:
			return Object.assign({}, state, commonUpdatedState, {
				isFetchingApplicants: true
			});
		case APPLICANTS_FETCH_SUCCESS:
			return Object.assign({}, state, commonUpdatedState, {
				isFetchingApplicants: false,
				applicants: action.applicants
			});
		case APPLICANTS_FETCH_FAILURE:
			return Object.assign({}, state, commonUpdatedState, {
				isFetchingApplicants: false,
				applicantsFetchErrors: action.applicantsFetchErrors,
				applicants: []
			});
		default:
			return state;
	}
};

export default recruitmentApp;
