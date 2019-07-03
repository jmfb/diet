import BaseApi from './BaseApi';
import {
	IPlanSummary,
	IPlan,
	INutrition,
	IFood,
	IMeal,
	IIngredient,
	IFoodOrRecipe
} from '~/models';
import * as queryString from 'query-string';

export default class MealsApi extends BaseApi {
	static async getPlans() {
		const response = await fetch('/api/Meals/GetPlans', {
			credentials: 'same-origin',
			headers: {
				Accept: 'application/json',
				Authorization: super.authHeader()
			}
		});
		await super.checkStatus(response);
		return await response.json() as IPlanSummary[];
	}

	static async getPlan(id: number) {
		const query = queryString.stringify({ id });
		const response = await fetch(`/api/Meals/GetPlan?${query}`, {
			credentials: 'same-origin',
			headers: {
				Accept: 'application/json',
				Authorization: super.authHeader()
			}
		});
		await super.checkStatus(response);
		return await response.json() as IPlan;
	}

	static async updatePlan(
		id: number,
		name: string,
		target: INutrition,
		meals: IMeal[]
	) {
		const response = await fetch('/api/Meals/UpdatePlan', {
			credentials: 'same-origin',
			method: 'POST',
			headers: {
				Accept: 'application/json',
				Authorization: super.authHeader(),
				['Content-Type']: 'application/json'
			},
			body: JSON.stringify({ id, name, target, meals })
		});
		await super.checkStatus(response);
		return await response.json() as number;
	}

	static async deletePlan(id: number) {
		const query = queryString.stringify({ id });
		const response = await fetch(`/api/Meals/DeletePlan?${query}`, {
			credentials: 'same-origin',
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				Authorization: super.authHeader()
			}
		});
		await super.checkStatus(response);
	}

	static async getFoods() {
		const response = await fetch('/api/Meals/GetFoods', {
			credentials: 'same-origin',
			headers: {
				Accept: 'application/json',
				Authorization: super.authHeader()
			}
		});
		await super.checkStatus(response);
		return await response.json() as IFood[];
	}

	static async getFood(id: number) {
		const query = queryString.stringify({ id });
		const response = await fetch(`/api/Meals/GetFood?${query}`, {
			credentials: 'same-origin',
			headers: {
				Accept: 'application/json',
				Authorization: super.authHeader()
			}
		});
		await super.checkStatus(response);
		return await response.json() as IFoodOrRecipe;
	}

	static async updateFood(
		id: number,
		name: string,
		unitSize: number,
		unitMeasure: string,
		siteUrl: string,
		nutrition: INutrition
	) {
		const response = await fetch('/api/Meals/UpdateFood', {
			credentials: 'same-origin',
			method: 'POST',
			headers: {
				Accept: 'application/json',
				Authorization: super.authHeader(),
				['Content-Type']: 'application/json'
			},
			body: JSON.stringify({ id, name, unitSize, unitMeasure, siteUrl, nutrition })
		});
		await super.checkStatus(response);
		return await response.json() as number;
	}

	static async updateRecipe(
		id: number,
		name: string,
		unitSize: number,
		unitMeasure: string,
		siteUrl: string,
		ingredients: IIngredient[]
	) {
		const response = await fetch('/api/Meals/UpdateRecipe', {
			credentials: 'same-origin',
			method: 'POST',
			headers: {
				Accept: 'application/json',
				Authorization: super.authHeader(),
				['Content-Type']: 'application/json'
			},
			body: JSON.stringify({ id, name, unitSize, unitMeasure, siteUrl, ingredients })
		});
		await super.checkStatus(response);
		return await response.json() as number;
	}

	static async deleteFood(id: number) {
		const query = queryString.stringify({ id });
		const response = await fetch(`/api/Meals/DeleteFood?${query}`, {
			credentials: 'same-origin',
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				Authorization: super.authHeader()
			}
		});
		await super.checkStatus(response);
	}
}
