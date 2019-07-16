import * as React from 'react';
import Card from '~/components/Card';
import Button from '~/components/Button';
import Banner from '~/components/Banner';
import { IFood, IIngredient } from '~/models';
import * as pluralize from 'pluralize';
import { sum } from 'lodash';
import * as styles from './EditRecipe.scss';

interface IEditRecipeProps {
	foods: IFood[];
	availableIngredients: IFood[];
	name: string;
	unitSize: number;
	unitMeasure: string;
	siteUrl: string;
	ingredients: IIngredient[];
	recipes: string[];
	submitting: boolean;
	onUpdateName(name: string): void;
	onUpdateUnitSize(unitSize: number): void;
	onUpdateUnitMeasure(unitMeasure: string): void;
	onUpdateSiteUrl(siteUrl: string): void;
	onAddIngredient(id: number): void;
	onUpdateQuantity(index: number, quantity: number): void;
	onClickSubmit(): void;
	onClickCancel(): void;
	onClickCopy?(): void;
	onClickDelete?(): void;
}

export default class EditRecipe extends React.PureComponent<IEditRecipeProps> {
	handleChangeName = (e: React.FormEvent<HTMLInputElement>) => {
		const { onUpdateName } = this.props;
		onUpdateName(e.currentTarget.value);
	}

	handleChangeUnitSize = (e: React.FormEvent<HTMLInputElement>) => {
		const { onUpdateUnitSize } = this.props;
		onUpdateUnitSize(+e.currentTarget.value);
	}

	handleChangeUnitMeasure = (e: React.FormEvent<HTMLInputElement>) => {
		const { onUpdateUnitMeasure } = this.props;
		onUpdateUnitMeasure(e.currentTarget.value);
	}

	handleChangeSiteUrl = (e: React.FormEvent<HTMLInputElement>) => {
		const { onUpdateSiteUrl } = this.props;
		onUpdateSiteUrl(e.currentTarget.value);
	}

	handleChangeNewIngredient = (e: React.FormEvent<HTMLSelectElement>) => {
		const { onAddIngredient } = this.props;
		onAddIngredient(+e.currentTarget.value);
	}

	handleChangeQuantity = (index: number) => {
		return (e: React.FormEvent<HTMLInputElement>) => {
			const { onUpdateQuantity } = this.props;
			onUpdateQuantity(index, +e.currentTarget.value);
		};
	}

	getTotalNutrition = () => {
		const { foods, ingredients } = this.props;
		const details = ingredients.map(ingredient => ({
			quantity: ingredient.quantity,
			nutrition: foods.find(food => food.id === ingredient.id).nutrition
		}));
		return {
			protein: sum(details.map(detail => detail.quantity * detail.nutrition.protein)),
			fat: sum(details.map(detail => detail.quantity * detail.nutrition.fat)),
			carbohydrates: sum(details.map(detail => detail.quantity * detail.nutrition.carbohydrates))
		};
	}

	render() {
		const {
			availableIngredients,
			name,
			unitSize,
			unitMeasure,
			siteUrl,
			ingredients,
			recipes,
			submitting,
			onClickSubmit,
			onClickCancel,
			onClickCopy,
			onClickDelete
		} = this.props;

		const totalNutrition = this.getTotalNutrition();
		const proteinCalories = totalNutrition.protein * 4;
		const fatCalories = totalNutrition.fat * 9;
		const carbohydratesCalories = totalNutrition.carbohydrates * 4;
		const totalCalories = Math.round(proteinCalories + fatCalories + carbohydratesCalories);
		const fatPercent = totalCalories === 0 ? 0 : Math.round(fatCalories / totalCalories * 100);
		const carbohydratesPercent = totalCalories === 0 ? 0 : Math.round(carbohydratesCalories / totalCalories * 100);
		const proteinPercent = 100 - fatPercent - carbohydratesPercent;

		return (
			<Card className={styles.root}>
				<input
					className={styles.name}
					type='text'
					value={name}
					onChange={this.handleChangeName}
					placeholder='Recipe name (e.g. Mixed Vegatables)'
					maxLength={30}
					autoFocus />
				<table>
					<tbody>
						<tr>
							<td className={styles.label}>Unit Size:</td>
							<td>
								<input
									className={styles.unitSize}
									type='number'
									value={unitSize}
									onChange={this.handleChangeUnitSize}
									placeholder='e.g. 5' />
							</td>
						</tr>
						<tr>
							<td className={styles.label}>Unit Measure:</td>
							<td>
								<input
									type='text'
									value={unitMeasure}
									onChange={this.handleChangeUnitMeasure}
									placeholder='e.g. ounce'
									maxLength={30} />
							</td>
						</tr>
						<tr>
							<td className={styles.label}>Site URL:</td>
							<td>
								<input
									className={styles.siteUrl}
									type='text'
									value={siteUrl}
									onChange={this.handleChangeSiteUrl}
									placeholder='e.g. http://example.com/mixed-vegetables' />
							</td>
						</tr>
					</tbody>
				</table>
				<h2>Ingredients</h2>
				<table>
					<thead>
						<tr>
							<td className={styles.label}>Food</td>
							<td className={styles.label}>Quantity</td>
							<td className={styles.label}>Measure</td>
							<td className={styles.label}>Protein (g)</td>
							<td className={styles.label}>Fat (g)</td>
							<td className={styles.label}>Carbs (g)</td>
							<td className={styles.label}>Calories</td>
						</tr>
					</thead>
					<tbody>
						{ingredients.map((ingredient, i) => this.renderIngredient(ingredient, i))}
						<tr>
							<td colSpan={7}>
								<select onChange={this.handleChangeNewIngredient} value=''>
									<option value=''>Add new food...</option>
									{availableIngredients.map((food, i) => (
										<option key={i} value={food.id}>{food.name}</option>
									))}
								</select>
							</td>
						</tr>
					</tbody>
					<tfoot>
						<tr>
							<td className={styles.label} colSpan={3}>Total:</td>
							<td>{Math.round(totalNutrition.protein * 10) / 10}</td>
							<td>{Math.round(totalNutrition.fat * 10) / 10}</td>
							<td>{Math.round(totalNutrition.carbohydrates * 10) / 10}</td>
							<td>{proteinPercent} / {fatPercent} / {carbohydratesPercent}</td>
						</tr>
						<tr>
							<td className={styles.label} colSpan={3}>Calories:</td>
							<td>{Math.round(proteinCalories)}</td>
							<td>{Math.round(fatCalories)}</td>
							<td>{Math.round(carbohydratesCalories)}</td>
							<td>{totalCalories}</td>
						</tr>
					</tfoot>
				</table>
				{recipes.length > 0 &&
					<div>
						<div className={styles.recipeLabel}>Included in the following recipes:</div>
						<ul className={styles.recipes}>
							{recipes.map((recipe, i) => (
								<li key={i}>{recipe}</li>
							))}
						</ul>
					</div>
				}
				{submitting &&
					<Banner type='message' display='Submitting food...' />
				}
				{!submitting && name.length === 0 &&
					<Banner type='error' display='Please enter a name.' />
				}
				{!submitting && name.length > 0 &&
					<Button className={styles.button} type='primary' display='Submit' onClick={onClickSubmit} />
				}
				{!submitting &&
					<Button className={styles.button} type='secondary' display='Cancel' onClick={onClickCancel} />
				}
				{!submitting && onClickCopy &&
					<Button className={styles.button} type='secondary' display='Copy' onClick={onClickCopy} />
				}
				{!submitting && recipes.length === 0 && onClickDelete &&
					<Button className={styles.button} type='danger' display='Delete' onClick={onClickDelete} />
				}
			</Card>
		);
	}

	renderIngredient = (ingredient: IIngredient, index: number) => {
		const { foods } = this.props;
		const { id, quantity } = ingredient;
		const food = foods.find(food => food.id === id);
		const { name, unitSize, unitMeasure, nutrition } = food;
		const { protein, fat, carbohydrates } = nutrition;
		const size = Math.round(quantity * unitSize * 10) / 10;
		const totalProtein = Math.round(protein * quantity * 10) / 10;
		const totalFat = Math.round(fat * quantity * 10) / 10;
		const totalCarbohydrates = Math.round(carbohydrates * quantity * 10) / 10;
		const calories = Math.round(totalProtein * 4 + totalFat * 9 + totalCarbohydrates * 4);
		return (
			<tr key={index}>
				<td>{name}</td>
				<td>
					<input
						className={styles.quantity}
						type='number'
						value={quantity}
						onChange={this.handleChangeQuantity(index)} />
				</td>
				<td>{size} {pluralize(unitMeasure === '' ? name : unitMeasure, size)}</td>
				<td>{totalProtein}</td>
				<td>{totalFat}</td>
				<td>{totalCarbohydrates}</td>
				<td>{calories}</td>
			</tr>
		);
	}
}
