import { API_ROOT_URL, LOCAL_STORAGE_AUTH_TOKEN_NAME } from './consts';
import { getLanguage } from './utils';
import messages from './messages';

/**
 * Returns appropriate HTTP headers for authenticated API requests.
 */
const authenticatedRequestHeaders = () => {
	let headers = {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	}
	let token = localStorage.getItem(LOCAL_STORAGE_AUTH_TOKEN_NAME);
	if (token) {
		headers['Authorization'] = 'JWT ' + token
	}
	return new Headers(headers);
}

/**
 * Performs an HTTP request and returns the received JSON or other data that
 * describes the result.
 */
const fetchJSON = (url, request) => {
	let lang = getLanguage();
	return fetch(url, request)
		.then(response => response.json()
			.then(
				body => {
					let ok = response.ok;
					return {ok, body}
				}
			).catch(error => {
				return {
					ok: false,
					body: {
						request: [messages[lang].apiJSONFailed]
					}
				}
			})
		)
		.catch(error => {
			return {
				ok: false,
				body: {
					request: [messages[lang].apiRequestFailed]
				}
			}
		});
}

/**
 * A set of functions that perform API requests.
 */
export default {
	login: {
		post: credentials => {
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
			return fetchJSON(url, request);
		}
	},
	applicants: {
		get: (params) => {
			let url = API_ROOT_URL + '/applicants/';
			if (params && Object.keys(params).indexOf('id') >= 0 && params.id) {
				url += params.id + '/'
			}
			let request = {
				method: 'GET',
				headers: authenticatedRequestHeaders()
			};
			return fetchJSON(url, request);
		},
		patch: (id, data) => {
			let url = API_ROOT_URL + '/applicants/' + id + '/';
			let request = {
				method: 'PATCH',
				headers: authenticatedRequestHeaders(),
				body: JSON.stringify(data)
			};
			return fetchJSON(url, request);
		}
	},
	competences: {
		get: () => {
			let url = API_ROOT_URL + '/competences/';
			let request = {
				method: 'GET',
				headers: authenticatedRequestHeaders()
			};
			return fetchJSON(url, request);
		}
	},

}
