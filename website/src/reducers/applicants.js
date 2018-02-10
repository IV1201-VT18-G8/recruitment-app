import { APPLICANTS_FETCH_REQUEST, APPLICANTS_FETCH_SUCCESS, APPLICANTS_FETCH_FAILURE } from '../actions';

let initState = {
	isFetching: false,
	applicants: []
};

const applicants = (state = initState, action) => {

	let commonUpdatedState = {
		isFetching: action.isFetching
	}

	switch (action.type) {
		case APPLICANTS_FETCH_REQUEST:
			return Object.assign({}, state, commonUpdatedState, {

			});
		case APPLICANTS_FETCH_SUCCESS:
			return Object.assign({}, state, commonUpdatedState, {
				errorMessage: '',
				applicants: action.applicants
			});
		case APPLICANTS_FETCH_FAILURE:
			return Object.assign({}, state, commonUpdatedState, {
				errorMessage: "Failed to list applicants.",
				applicants: []
			});
		default:
			return state;
	}
};

export default applicants;
