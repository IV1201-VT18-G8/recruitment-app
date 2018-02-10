/**
 * Based on tutorial by Ryan Chenkie.
 * https://auth0.com/blog/secure-your-react-and-redux-app-with-jwt-authentication/
 */

import { AUTH_TOKEN_NAME } from './consts';
import api from './api';


/**
 * Login
 */

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const requestLogin = () => ({
	type: LOGIN_REQUEST,
	isFetching: true,
	isAuthenticated: false,
});

export const receiveLogin = (user) => ({
	type: LOGIN_SUCCESS,
	isFetching: false,
	isAuthenticated: true,
	errorMessage: ''
});

export const loginError = (errorMessage) => ({
	type: LOGIN_FAILURE,
	isFetching: false,
	isAuthenticated: false,
	errorMessage: errorMessage
});

export const requestLogout = () => {
	return {
		type: LOGOUT_REQUEST,
		isFetching: true,
		isAuthenticated: true,
		errorMessage: ''
	}
}

export const receiveLogout = () => {
	return {
		type: LOGOUT_SUCCESS,
		isFetching: false,
		isAuthenticated: false,
		errorMessage: ''
	}
}

export const attemptLogin = (credentials) => {
	return dispatch => {
		dispatch(requestLogin());
		api.login.post(credentials)
			.then(({ ok, body }) => {
				if (!ok) {
					localStorage.removeItem(AUTH_TOKEN_NAME);
					let errorMsg = getErrorMsg(body);
					dispatch(loginError(errorMsg))
					return Promise.reject(body);
				} else {
					localStorage.setItem(AUTH_TOKEN_NAME, body.token);
					dispatch(receiveLogin(body));
				}
			})
	}
};

const getErrorMsg = (responseBody) => {
	if ('non_field_errors' in responseBody) {
		return responseBody.non_field_errors[0]
	} else {
		return ''
	}
}

export const logout = () => {
	return dispatch => {
		dispatch(requestLogout);
		localStorage.removeItem(AUTH_TOKEN_NAME);
		dispatch(receiveLogout());
	}
};


/**
 * Fetch multiple applicants
 */

export const APPLICANTS_FETCH_REQUEST = 'APPLICANTS_FETCH_REQUEST';
export const APPLICANTS_FETCH_SUCCESS = 'APPLICANTS_FETCH_SUCCESS';
export const APPLICANTS_FETCH_FAILURE = 'APPLICANTS_FETCH_FAILURE';

export const requestApplicants = () => ({
	type: APPLICANTS_FETCH_REQUEST,
	isFetching: true
});

export const receiveApplicants = (applicants) => ({
	type: APPLICANTS_FETCH_SUCCESS,
	isFetching: false,
	applicants
});

export const applicantsFetchError = () => ({
	type: APPLICANTS_FETCH_FAILURE,
	isFetching: false
});

export const attemptFetchApplicants = () => {
	return dispatch => {
		dispatch(requestApplicants());
		api.applicants.get()
			.then(({ ok, body }) => {
				if (!ok) {
					dispatch(applicantsFetchError());
					return Promise.reject(body);
				} else {
					dispatch(receiveApplicants(body));
				}
			})
	}
};
