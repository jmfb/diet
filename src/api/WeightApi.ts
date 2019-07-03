import BaseApi from './BaseApi';
import { IWeightRecord } from '~/models';
import * as queryString from 'query-string';
import * as moment from 'moment';

export default class WeightsApi extends BaseApi {
	static async updateWeight(when: string, weightInPounds: number) {
		const query = queryString.stringify({ when, weightInPounds });
		const response = await fetch(`/api/Weight/UpdateWeight?${query}`, {
			credentials: 'same-origin',
			method: 'POST',
			headers: {
				Accept: 'application/json',
				Authorization: super.authHeader()
			}
		});
		await super.checkStatus(response);
	}

	static async deleteWeight(when: string) {
		const query = queryString.stringify({ when });
		const response = await fetch(`/api/Weight/DeleteWeight?${query}`, {
			credentials: 'same-origin',
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				Authorization: super.authHeader()
			}
		});
		await super.checkStatus(response);
	}

	static async getWeights(
		startDate: moment.Moment,
		endDateExclusive: moment.Moment
	) {
		const query = queryString.stringify({
			startDate: startDate.format('YYYY-MM-DD'),
			endDateExclusive: endDateExclusive.format('YYYY-MM-DD')
		});
		const response = await fetch(`/api/Weight/GetWeights?${query}`, {
			credentials: 'same-origin',
			headers: {
				Accept: 'application/json',
				Authorization: super.authHeader()
			}
		});
		await super.checkStatus(response);
		return await response.json() as IWeightRecord[];
	}

	static async getRecentWeights(skip: number, take: number) {
		const query = queryString.stringify({ skip, take });
		const response = await fetch(`/api/Weight/GetRecentWeights?${query}`, {
			credentials: 'same-origin',
			headers: {
				Accept: 'application/json',
				Authorization: super.authHeader()
			}
		});
		await super.checkStatus(response);
		return await response.json() as IWeightRecord[];
	}
}
