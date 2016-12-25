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
