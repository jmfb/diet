export interface ILoginModel {
	token: string;
	name: string;
}

export const genders = ['Male', 'Female'];
export const genderMale = 0;
export const genderFemale = 1;
export type IGender = 0 | 1;

export const bodyTypes = ['Endomorph', 'Mesomorph', 'Ectomorph'];
export const bodyTypeEndomorph = 0;
export const bodyTypeMesomorph = 1;
export const bodyTypeEctomorph = 2;
export type IBodyType = 0 | 1 | 2;

export interface IProfile {
	genderId: IGender | null;
	bodyTypeId: IBodyType | null;
	heightInInches: number | null;
	birthYear: number | null;
	targetWeightInPounds: number | null;
}

export interface IWeightRecord {
	when: string;
	weightInPounds: number;
}

export interface INutrition {
	protein: number;
	carbohydrates: number;
	fat: number;
}

export interface IPlanSummary {
	id: number;
	name: string;
	target: INutrition;
	actual: INutrition;
}

export interface IFood {
	id: number;
	name: string;
	unitSize: number;
	unitMeasure: string;
	siteUrl: string;
	nutrition: INutrition;
}

export interface IMeal {
	id: number;
	quantity: number;
}

export interface IPlan {
	id: number;
	name: string;
	target: INutrition;
	meals: IMeal[];
}

export interface IIngredient {
	id: number;
	quantity: number;
}

export interface IFoodOrRecipe {
	id: number;
	name: string;
	unitSize: number;
	unitMeasure: string;
	siteUrl: string;
	nutrition: INutrition | null;
	ingredients: IIngredient[];
	recipes: number[];
}
