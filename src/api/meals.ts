import { checkStatus, parseJson, authHeader } from './helpers';
import { IPlanSummary, IPlan, INutrition, IFood, IMeal } from '~/models';
import * as queryString from 'query-string';

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

export function getPlan(id: number) {
	const query = queryString.stringify({ id });
	return fetch(`/api/Meals/GetPlan?${query}`, {
		credentials: 'same-origin',
		headers: {
			Accept: 'application/json',
			Authorization: authHeader()
		}
	})
	.then(checkStatus)
	.then<IPlan>(parseJson);
}

export function updatePlan(
	id: number,
	name: string,
	target: INutrition,
	meals: IMeal[]) {
	return fetch('/api/Meals/UpdatePlan', {
		credentials: 'same-origin',
		method: 'POST',
		headers: {
			Accept: 'application/json',
			Authorization: authHeader(),
			['Content-Type']: 'application/json'
		},
		body: JSON.stringify({ id, name, target, meals })
	})
	.then(checkStatus);
}

export function deletePlan(id: number) {
	const query = queryString.stringify({ id });
	return fetch(`/api/Meals/DeletePlan?${query}`, {
		credentials: 'same-origin',
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			Authorization: authHeader()
		}
	})
	.then(checkStatus);
}

export function getFoods() {
	return fetch('/api/Meals/GetFoods', {
		credentials: 'same-origin',
		headers: {
			Accept: 'application/json',
			Authorization: authHeader()
		}
	})
	.then(checkStatus)
	.then<IFood[]>(parseJson);
}
