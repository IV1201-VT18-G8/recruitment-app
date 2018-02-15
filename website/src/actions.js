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
	type: LOGIN_REQUEST
});

export const receiveLogin = (user) => ({
	type: LOGIN_SUCCESS
});

export const loginError = (loginErrors) => ({
	type: LOGIN_FAILURE,
	loginErrors
});

export const requestLogout = () => ({
	type: LOGOUT_REQUEST
})

export const receiveLogout = () => ({
	type: LOGOUT_SUCCESS
})

export const attemptLogin = (credentials) => {
	return dispatch => {
		dispatch(requestLogin());
		api.login.post(credentials)
			.then(({ ok, body }) => {
				if (!ok) {
					localStorage.removeItem(AUTH_TOKEN_NAME);
					dispatch(loginError(body))
					return Promise.reject(body);
				} else {
					localStorage.setItem(AUTH_TOKEN_NAME, body.token);
					dispatch(receiveLogin(body));
				}
			})
	}
};

// const getErrorMsg = (responseBody) => {
// 	if ('non_field_errors' in responseBody) {
// 		return responseBody.non_field_errors[0]
// 	} else {
// 		return ''
// 	}
// }

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
});

export const receiveApplicants = (applicants) => ({
	type: APPLICANTS_FETCH_SUCCESS,
	applicants
});

export const applicantsFetchError = (applicantsFetchErrors) => ({
	type: APPLICANTS_FETCH_FAILURE,
	applicantsFetchErrors
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
