import { checkStatus, parseJson, authHeader } from './helpers';
import { IPlanSummary } from '~/models';

export function getPlans() {
	return fetch('/api/Meals/GetPlans', {
		credentials: 'same-origin',
		headers: {
			Accept: 'application/json',
			Authorization: authHeader()
		}
	})
	.then(checkStatus)
	.then<IPlanSummary[]>(parseJson);
}
