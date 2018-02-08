/**
 * Based on tutorial by Ryan Chenkie.
 * https://auth0.com/blog/secure-your-react-and-redux-app-with-jwt-authentication/
 */

import { API_ROOT_URL, AUTH_TOKEN_NAME } from './consts';
import { authenticatedRequestHeaders } from './api';


/**
 * Login
 */

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const requestLogin = (credentials) => ({
	type: LOGIN_REQUEST,
	isFetching: true,
	isAuthenticated: false,
	credentials
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
	let url = API_ROOT_URL + '/login/';
	let request = {
		method: 'POST',
		headers: new Headers({
			'Content-Type': 'application/json'
		}),
		body: JSON.stringify({
			username: credentials.username,
			password: credentials.password
		})
	};
	return dispatch => {
		dispatch(requestLogin(credentials));
		return fetch(url, request)
			.then(response =>
				response.json().then(responseBody => ({responseBody, response}))
			)
			.then(({responseBody, response}) => {
				if (!response.ok) {
					let errorMsg = getErrorMsg(responseBody);
					dispatch(loginError(errorMsg))
					return Promise.reject(responseBody);
				} else {
					localStorage.setItem(AUTH_TOKEN_NAME, responseBody.token);
					dispatch(receiveLogin(responseBody));
				}
			})
			.catch(error => console.log("Error: ", error));
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

export const applicantsFetchError = (message) => ({
	type: APPLICANTS_FETCH_FAILURE,
	isFetching: false,
	message
});

export const attemptFetchApplicants = () => {
	let url = API_ROOT_URL + '/applicants/';
	let request = {
		method: 'GET',
		headers: authenticatedRequestHeaders()
	};
	return dispatch => {
		dispatch(requestApplicants());
		return fetch(url, request)
			.then(response =>
				response.json().then(responseBody => ({responseBody, response}))
			)
			.then(({responseBody, response}) => {
				if (!response.ok) {
					dispatch(applicantsFetchError(responseBody.message));
					return Promise.reject(responseBody);
				} else {
					dispatch(receiveApplicants(responseBody));
				}
			})
			.catch(error => console.log("Error: ", error));
	}
};
