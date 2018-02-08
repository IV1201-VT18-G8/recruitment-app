import { APPLICANTS_FETCH_REQUEST, APPLICANTS_FETCH_SUCCESS, APPLICANTS_FETCH_FAILURE } from '../actions';

let initState = {
	isFetching: false,
	applicants: []
};

const applicants = (state = initState, action) => {
	switch (action.type) {
		case APPLICANTS_FETCH_REQUEST:
			return Object.assign({}, state, {
				isFetching: action.isFetching,
			});
		case APPLICANTS_FETCH_SUCCESS:
			return Object.assign({}, state, {
				isFetching: action.isFetching,
				errorMessage: '',
				applicants: action.applicants
			});
		case APPLICANTS_FETCH_FAILURE:
			return Object.assign({}, state, {
				isFetching: action.isFetching,
				errorMessage: action.message
			});
		default:
			return state;
	}
};

export default applicants;
