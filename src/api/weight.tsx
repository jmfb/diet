import { checkStatus, authHeader } from './helpers';
import * as queryString from 'query-string';

export function updateWeight(when: string, weightInPounds: number) {
	const query = queryString.stringify({ when, weightInPounds });
	return fetch(`/api/Weight/UpdateWeight?${query}`, {
		credentials: 'same-origin',
		method: 'POST',
		headers: {
			Accept: 'application/json',
			Authorization: authHeader()
		}
	})
	.then(checkStatus);
}
