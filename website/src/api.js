import { API_ROOT_URL, LOCAL_STORAGE_AUTH_TOKEN_NAME } from './consts';


const authenticatedRequestHeaders = () => {
	let headers = {
		'Accept': 'application/json'
	}
	let token = localStorage.getItem(LOCAL_STORAGE_AUTH_TOKEN_NAME);
	if (token) {
		headers['Authorization'] = 'JWT ' + token
	}
	return new Headers(headers);
}

const fetchJSON = (url, request) => {
	return fetch(url, request)
		.then(response => response.json()
			.then(
				body => {
					let ok = response.ok;
					return {ok, body}
				}
			)
		)
		.catch(error => console.log("Error: ", error));
}

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
		get: () => {
			let url = API_ROOT_URL + '/applicants/';
			let request = {
				method: 'GET',
				headers: authenticatedRequestHeaders()
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
	}

}
