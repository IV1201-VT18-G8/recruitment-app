import {
	LOCAL_STORAGE_AUTH_TOKEN_NAME,
	LOCAL_STORAGE_IS_APPLICANT_NAME,
	LOCAL_STORAGE_IS_RECRUITER_NAME,
	LOCAL_STORAGE_USER_ID_NAME
} from '../consts';
import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	LOGOUT_SUCCESS,
	APPLICANTS_FETCH_REQUEST,
	APPLICANTS_FETCH_SUCCESS,
	APPLICANTS_FETCH_FAILURE,
	APPLICANT_SELF_FETCH_REQUEST,
	APPLICANT_SELF_FETCH_SUCCESS,
	APPLICANT_SELF_FETCH_FAILURE,
	APPLICANT_PATCH_REQUEST,
	APPLICANT_PATCH_SUCCESS,
	APPLICANT_PATCH_FAILURE,
	COMPETENCES_FETCH_REQUEST,
	COMPETENCES_FETCH_SUCCESS,
	COMPETENCES_FETCH_FAILURE,
} from '../actions';
import { getParsedFromLocalStorage } from '../utils';

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
	applicants: [],
	isFetchingApplicantSelf: false,
	applicantSelfFetchErrors: {},
	applicantSelf: {},
	isPatchingApplicant: false,
	applicantPatchSuccess: false,
	applicantPatchErrors: {},
	isFetchingCompetences: false,
	competencesFetchErrors: {},
	competences: []
};

/**
 * The Redux reducer.
 */
const recruitmentApp = (state = initState, action) => {
	let commonUpdatedState = {
		...getCurrentAuthState(),
		applicantPatchSuccess: false,
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
		case APPLICANT_SELF_FETCH_REQUEST:
			return Object.assign({}, state, commonUpdatedState, {
				isFetchingApplicantSelf: true
			});
		case APPLICANT_SELF_FETCH_SUCCESS:
			return Object.assign({}, state, commonUpdatedState, {
				isFetchingApplicantSelf: false,
				applicantSelf: action.applicantSelf,
				applicantSelfFetchErrors: {}
			});
		case APPLICANT_SELF_FETCH_FAILURE:
			return Object.assign({}, state, commonUpdatedState, {
				isFetchingApplicantSelf: false,
				applicantSelfFetchErrors: action.applicantSelfFetchErrors,
				applicantSelf: {}
			});
		case APPLICANT_PATCH_REQUEST:
			return Object.assign({}, state, commonUpdatedState, {
				isPatchingApplicant: true
			});
		case APPLICANT_PATCH_SUCCESS:
			return Object.assign({}, state, commonUpdatedState, {
				isPatchingApplicant: false,
				applicantPatchSuccess: true,
				applicantPatchErrors: {},
				applicantSelf: action.response.id === state.user_id ? action.response : state.applicantSelf,
			});
		case APPLICANT_PATCH_FAILURE:
			return Object.assign({}, state, commonUpdatedState, {
				isPatchingApplicant: false,
				applicantPatchErrors: action.applicantPatchErrors,
			});
		case COMPETENCES_FETCH_REQUEST:
			return Object.assign({}, state, commonUpdatedState, {
				isFetchingCompetences: true
			});
		case COMPETENCES_FETCH_SUCCESS:
			return Object.assign({}, state, commonUpdatedState, {
				isFetchingCompetences: false,
				competences: action.competences,
				competencesFetchErrors: {}
			});
		case COMPETENCES_FETCH_FAILURE:
			return Object.assign({}, state, commonUpdatedState, {
				isFetchingCompetences: false,
				competencesFetchErrors: action.competencesFetchErrors,
				competences: []
			});
		default:
			return state;
	}
};

export default recruitmentApp;
