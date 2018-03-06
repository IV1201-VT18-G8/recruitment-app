import {
	LOCAL_STORAGE_AUTH_TOKEN_NAME,
	LOCAL_STORAGE_IS_APPLICANT_NAME,
	LOCAL_STORAGE_IS_RECRUITER_NAME,
	LOCAL_STORAGE_USER_ID_NAME
} from '../consts';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const APPLICANTS_FETCH_REQUEST = 'APPLICANTS_FETCH_REQUEST';
export const APPLICANTS_FETCH_SUCCESS = 'APPLICANTS_FETCH_SUCCESS';
export const APPLICANTS_FETCH_FAILURE = 'APPLICANTS_FETCH_FAILURE';

const getParsedFromLocalStorage = (name) => {
	let raw = localStorage.getItem(name);
	return JSON.parse(raw);
}

/**
 * Determine the current authentication state based on local storage.
 */
const getCurrentAuthState = () => {
	const isAuthenticated = localStorage.getItem(LOCAL_STORAGE_AUTH_TOKEN_NAME) ? true : false;
	const isApplicant = isAuthenticated && getParsedFromLocalStorage(LOCAL_STORAGE_IS_APPLICANT_NAME);
	const isRecruiter = isAuthenticated && getParsedFromLocalStorage(LOCAL_STORAGE_IS_RECRUITER_NAME);
	return {
		isAuthenticated: isAuthenticated,
		isApplicant: isApplicant,
		isRecruiter: isRecruiter,
		user_id: getParsedFromLocalStorage(LOCAL_STORAGE_USER_ID_NAME),
	};
}

let initState = {
	...getCurrentAuthState(),
	loginErrors: {},
	isFetchingApplicants: false,
	applicantsFetchErrors: {},
	applicants: []
};

/**
 * The Redux reducer.
 */
const recruitmentApp = (state = initState, action) => {
	let commonUpdatedState = {
		...getCurrentAuthState()
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
				applicants: [],
				applicantsFetchErrors: {}
			});
		case APPLICANTS_FETCH_REQUEST:
			return Object.assign({}, state, commonUpdatedState, {
				isFetchingApplicants: true
			});
		case APPLICANTS_FETCH_SUCCESS:
			return Object.assign({}, state, commonUpdatedState, {
				isFetchingApplicants: false,
				applicants: action.applicants,
				applicantsFetchErrors: {}
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
