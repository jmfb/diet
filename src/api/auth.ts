import * as queryString from 'query-string';
import { checkStatus, parseJson } from './helpers';
import { ILoginModel } from '~/models';

const redirectUrl = `${location.origin}/authenticate`;

export function getAuthenticationUrl() {
	const query = queryString.stringify({ redirectUrl });
	return fetch(`/api/Authentication/GetAuthenticationUrl?${query}`, {
		headers: {
			Accept: 'application/json'
		}
	})
	.then(checkStatus)
	.then<string>(parseJson);
}

export function login(authorizationCode: string) {
	const query = queryString.stringify({
		redirectUrl,
		authorizationCode
	});
	return fetch(`/api/Authentication/Login?${query}`, {
		headers: {
			Accept: 'application/json'
		}
	})
	.then(checkStatus)
	.then<ILoginModel>(parseJson);
}
