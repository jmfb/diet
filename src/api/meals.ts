import { checkStatus, parseJson, authHeader } from './helpers';
import { IPlanSummary, IPlan, INutrition, IFood, IMeal, IIngredient, IFoodOrRecipe } from '~/models';
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

export function getFood(id: number) {
	const query = queryString.stringify({ id });
	return fetch(`/api/Meals/GetFood?${query}`, {
		credentials: 'same-origin',
		headers: {
			Accept: 'application/json',
			Authorization: authHeader()
		}
	})
	.then(checkStatus)
	.then<IFoodOrRecipe>(parseJson);
}

export function updateFood(
	id: number,
	name: string,
	unitSize: number,
	unitMeasure: string,
	siteUrl: string,
	nutrition: INutrition) {
	return fetch('/api/Meals/UpdateFood', {
		credentials: 'same-origin',
		method: 'POST',
		headers: {
			Accept: 'application/json',
			Authorization: authHeader(),
			['Content-Type']: 'application/json'
		},
		body: JSON.stringify({ id, name, unitSize, unitMeasure, siteUrl, nutrition })
	})
	.then(checkStatus);
}

export function updateRecipe(
	id: number,
	name: string,
	unitSize: number,
	unitMeasure: string,
	siteUrl: string,
	ingredients: IIngredient[]) {
	return fetch('/api/Meals/UpdateRecipe', {
		credentials: 'same-origin',
		method: 'POST',
		headers: {
			Accept: 'application/json',
			Authorization: authHeader(),
			['Content-Type']: 'application/json'
		},
		body: JSON.stringify({ id, name, unitSize, unitMeasure, siteUrl, ingredients })
	})
	.then(checkStatus);
}

export function deleteFood(id: number) {
	const query = queryString.stringify({ id });
	return fetch(`/api/Meals/DeleteFood?${query}`, {
		credentials: 'same-origin',
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			Authorization: authHeader()
		}
	})
	.then(checkStatus);
}
