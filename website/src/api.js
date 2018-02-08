import { AUTH_TOKEN_NAME } from './consts';

export const authenticatedRequestHeaders = () => {
	let token = localStorage.getItem(AUTH_TOKEN_NAME);
	if (token) {
		return new Headers({
			'Accept': 'application/json',
			'Authorization': 'JWT ' + token
		});
	} else {
		return new Headers({
			'Accept': 'application/json'
		});
	}
}
