/**
 * Based on tutorial by Ryan Chenkie.
 * https://auth0.com/blog/secure-your-react-and-redux-app-with-jwt-authentication/
 */

import {
	LOCAL_STORAGE_AUTH_TOKEN_NAME,
	LOCAL_STORAGE_USER_ID_NAME,
	LOCAL_STORAGE_IS_APPLICANT_NAME,
	LOCAL_STORAGE_IS_RECRUITER_NAME
} from './consts';
import api from './api';
import { getParsedFromLocalStorage } from './utils';

/**
 * Login and logout
 */

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const requestLogin = () => ({
	type: LOGIN_REQUEST
});

export const receiveLogin = () => ({
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

/**
 * Dispatch Redux actions in order to facilitate a login attempt.
 */
export const attemptLogin = (credentials) => {
	return dispatch => {
		dispatch(requestLogin());
		api.login.post(credentials)
			.then(({ ok, body }) => {
				if (!ok) {
					localStorage.removeItem(LOCAL_STORAGE_AUTH_TOKEN_NAME);
					localStorage.removeItem(LOCAL_STORAGE_USER_ID_NAME);
					localStorage.removeItem(LOCAL_STORAGE_IS_APPLICANT_NAME);
					localStorage.removeItem(LOCAL_STORAGE_IS_RECRUITER_NAME);
					dispatch(loginError(body))
					return Promise.reject(body);
				} else {
					localStorage.setItem(LOCAL_STORAGE_AUTH_TOKEN_NAME, body.token);
					localStorage.setItem(LOCAL_STORAGE_USER_ID_NAME, body.user_id);
					localStorage.setItem(LOCAL_STORAGE_IS_APPLICANT_NAME, body.is_applicant);
					localStorage.setItem(LOCAL_STORAGE_IS_RECRUITER_NAME, body.is_recruiter);
					dispatch(receiveLogin());
				}
			})
	}
};

export const logout = () => {
	return dispatch => {
		dispatch(requestLogout);
		localStorage.removeItem(LOCAL_STORAGE_AUTH_TOKEN_NAME);
		localStorage.removeItem(LOCAL_STORAGE_USER_ID_NAME);
		localStorage.removeItem(LOCAL_STORAGE_IS_APPLICANT_NAME);
		localStorage.removeItem(LOCAL_STORAGE_IS_RECRUITER_NAME);
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

/**
 * Dispatch Redux actions in order to facilitate a fetch of a list of
 * applicants.
 */
export const attemptFetchApplicants = () => {
	return dispatch => {
		dispatch(requestApplicants());
		api.applicants.get()
			.then(({ ok, body }) => {
				if (!ok) {
					dispatch(applicantsFetchError(body));
				} else {
					dispatch(receiveApplicants(body));
				}
			})
	}
};

/**
 * Fetch currently authenticated applicant
 */

export const APPLICANT_SELF_FETCH_REQUEST = 'APPLICANT_SELF_FETCH_REQUEST';
export const APPLICANT_SELF_FETCH_SUCCESS = 'APPLICANT_SELF_FETCH_SUCCESS';
export const APPLICANT_SELF_FETCH_FAILURE = 'APPLICANT_SELF_FETCH_FAILURE';

export const requestApplicantSelf = () => ({
	type: APPLICANT_SELF_FETCH_REQUEST,
});

export const receiveApplicantSelf = (applicantSelf) => ({
	type: APPLICANT_SELF_FETCH_SUCCESS,
	applicantSelf
});

export const applicantSelfFetchError = (applicantSelfFetchErrors) => ({
	type: APPLICANT_SELF_FETCH_FAILURE,
	applicantSelfFetchErrors
});

/**
 * Dispatch Redux actions in order to facilitate the fetching of the
 * authenticated applicant.
 */
export const attemptFetchApplicantSelf = () => {
	let user_id = getParsedFromLocalStorage(LOCAL_STORAGE_USER_ID_NAME)
	return dispatch => {
		dispatch(requestApplicantSelf());
		api.applicants.get({ id: user_id })
			.then(({ ok, body }) => {
				if (!ok) {
					dispatch(applicantSelfFetchError(body));
				} else {
					dispatch(receiveApplicantSelf(body));
				}
			})
	}
};


/**
 * PATCH a single applicant
 */

export const APPLICANT_PATCH_REQUEST = 'APPLICANT_PATCH_REQUEST';
export const APPLICANT_PATCH_SUCCESS = 'APPLICANT_PATCH_SUCCESS';
export const APPLICANT_PATCH_FAILURE = 'APPLICANT_PATCH_FAILURE';

export const requestApplicantPatch = () => ({
	type: APPLICANT_PATCH_REQUEST,
});

export const applicantPatchSuccess = response => ({
	type: APPLICANT_PATCH_SUCCESS,
	response
});

export const applicantPatchError = (applicantPatchErrors) => ({
	type: APPLICANT_PATCH_FAILURE,
	applicantPatchErrors
});

/**
 * Dispatch Redux actions in order to facilitate the patching of an applicant.
 */
export const attemptPatchApplicant = (id, data) => {
	return dispatch => {
		dispatch(requestApplicantPatch());
		api.applicants.patch(id, data)
			.then(({ ok, body }) => {
				if (!ok) {
					dispatch(applicantPatchError(body));
				} else {
					dispatch(applicantPatchSuccess(body));
				}
			})
	}
};

/**
 * Fetch multiple competences
 */

export const COMPETENCES_FETCH_REQUEST = 'COMPETENCES_FETCH_REQUEST';
export const COMPETENCES_FETCH_SUCCESS = 'COMPETENCES_FETCH_SUCCESS';
export const COMPETENCES_FETCH_FAILURE = 'COMPETENCES_FETCH_FAILURE';

export const requestCompetences = () => ({
	type: COMPETENCES_FETCH_REQUEST,
});

export const receiveCompetences = (competences) => ({
	type: COMPETENCES_FETCH_SUCCESS,
	competences
});

export const competencesFetchError = (competencesFetchErrors) => ({
	type: COMPETENCES_FETCH_FAILURE,
	competencesFetchErrors
});

export const attemptFetchCompetences = () => {
	return dispatch => {
		dispatch(requestCompetences());
		api.competences.get()
			.then(({ ok, body }) => {
				if (!ok) {
					dispatch(competencesFetchError(body));
				} else {
					dispatch(receiveCompetences(body));
				}
			})
	}
};
