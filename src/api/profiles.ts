import { IProfile } from '~/models';
import { checkStatus, parseJson, authHeader } from './helpers';

export function getProfile() {
	return fetch('/api/Profiles/GetProfile', {
		credentials: 'same-origin',
		headers: {
			Accept: 'application/json',
			Authorization: authHeader()
		}
	})
	.then(checkStatus)
	.then<IProfile>(parseJson);
}

export function updateProfile(profile: IProfile) {
	return fetch(`/api/Profiles/UpdateProfile`, {
		credentials: 'same-origin',
		method: 'POST',
		headers: {
			Accept: 'application/json',
			Authorization: authHeader(),
			['Content-Type']: 'application/json'
		},
		body: JSON.stringify(profile)
	})
	.then(checkStatus);
}
