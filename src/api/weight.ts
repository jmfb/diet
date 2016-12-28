import { checkStatus, parseJson, authHeader } from './helpers';
import { IWeightRecord } from '~/models';
import * as queryString from 'query-string';
import * as moment from 'moment';

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

export function deleteWeight(when: string) {
	const query = queryString.stringify({ when });
	return fetch(`/api/Weight/DeleteWeight?${query}`, {
		credentials: 'same-origin',
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			Authorization: authHeader()
		}
	})
	.then(checkStatus);
}

export function getWeights(
	startDate: moment.Moment,
	endDateExclusive: moment.Moment) {
	const query = queryString.stringify({
		startDate: startDate.format('YYYY-MM-DD'),
		endDateExclusive: endDateExclusive.format('YYYY-MM-DD')
	});
	return fetch(`/api/Weight/GetWeights?${query}`, {
		credentials: 'same-origin',
		headers: {
			Accept: 'application/json',
			Authorization: authHeader()
		}
	})
	.then(checkStatus)
	.then<IWeightRecord[]>(parseJson);
}

export function getRecentWeights(skip: number, take: number) {
	const query = queryString.stringify({ skip, take });
	return fetch(`/api/Weight/GetRecentWeights?${query}`, {
		credentials: 'same-origin',
		headers: {
			Accept: 'application/json',
			Authorization: authHeader()
		}
	})
	.then(checkStatus)
	.then<IWeightRecord[]>(parseJson);
}
