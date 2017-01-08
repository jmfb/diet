import * as React from 'react';
import Card from '~/components/Card';
import Banner from '~/components/Banner';
import Button from '~/components/Button';
import { IFood, IMeal } from '~/models';
import * as pluralize from 'pluralize';
import { sum } from 'lodash';
import * as styles from './EditMeal.scss';

interface IEditMealProps {
	foods: IFood[];
	name: string;
	targetCalories: number;
	targetProteinPercent: number;
	targetCarbohydratesPercent: number;
	targetFatPercent: number;
	meals: IMeal[];
	submitting: boolean;
	onUpdateName: (name: string) => void;
	onUpdateTargetCalories: (targetCalories: number) => void;
	onUpdateTargetPercent: (proteinPercent: number, carbohydratesPercent: number, fatPercent: number) => void;
	onAddMeal: (id: number) => void;
	onUpdateQuantity: (index: number, quantity: number) => void;
	onClickSubmit: () => void;
	onClickCancel: () => void;
	onClickCopy?: () => void;
	onClickDelete?: () => void;
}

export default class EditMeal extends React.PureComponent<IEditMealProps, void> {
	handleChangeName = (e: React.FormEvent<HTMLInputElement>) => {
		const { onUpdateName } = this.props;
		onUpdateName(e.currentTarget.value);
	}

	handleChangeTargetCalories = (e: React.FormEvent<HTMLInputElement>) => {
		const { onUpdateTargetCalories } = this.props;
		onUpdateTargetCalories(+e.currentTarget.value);
	}

	handleChangeTargetProteinPercent = (e: React.FormEvent<HTMLInputElement>) => {
		const { targetFatPercent, onUpdateTargetPercent } = this.props;
		const proteinPercent = +e.currentTarget.value;
		const carbohydratesPercent = 100 - proteinPercent - targetFatPercent;
		onUpdateTargetPercent(proteinPercent, carbohydratesPercent, targetFatPercent);
	}

	handleChangeTargetFatPercent = (e: React.FormEvent<HTMLInputElement>) => {
		const { targetProteinPercent, onUpdateTargetPercent } = this.props;
		const fatPercent = +e.currentTarget.value;
		const carbohydratesPercent = 100 - targetProteinPercent - fatPercent;
		onUpdateTargetPercent(targetProteinPercent, carbohydratesPercent, fatPercent);
	}

	handleChangeTargetCarbohydratesPercent = (e: React.FormEvent<HTMLInputElement>) => {
		const { targetProteinPercent, onUpdateTargetPercent } = this.props;
		const carbohydratesPercent = +e.currentTarget.value;
		const fatPercent = 100 - targetProteinPercent - carbohydratesPercent;
		onUpdateTargetPercent(targetProteinPercent, carbohydratesPercent, fatPercent);
	}

	handleChangeNewFood = (e: React.FormEvent<HTMLSelectElement>) => {
		const { onAddMeal } = this.props;
		onAddMeal(+e.currentTarget.value);
	}

	handleChangeQuantity = (index: number) => {
		return (e: React.FormEvent<HTMLInputElement>) => {
			const { onUpdateQuantity } = this.props;
			onUpdateQuantity(index, +e.currentTarget.value);
		};
	}

	getTotalNutrition = () => {
		const { foods, meals } = this.props;
		const details = meals.map(meal => ({ quantity: meal.quantity, nutrition: foods.find(food => food.id === meal.id).nutrition }));
		return {
			protein: sum(details.map(detail => detail.quantity * detail.nutrition.protein)),
			fat: sum(details.map(detail => detail.quantity * detail.nutrition.fat)),
			carbohydrates: sum(details.map(detail => detail.quantity * detail.nutrition.carbohydrates))
		};
	}

	render() {
		const {
			foods,
			name,
			targetCalories,
			targetProteinPercent,
			targetCarbohydratesPercent,
			targetFatPercent,
			meals,
			submitting,
			onClickSubmit,
			onClickCancel,
			onClickCopy,
			onClickDelete
		} = this.props;
		const targetProtein = targetCalories * targetProteinPercent / 100 / 4;
		const targetFat = targetCalories * targetFatPercent / 100 / 9;
		const targetCarbohydrates = targetCalories * targetCarbohydratesPercent / 100 / 4;
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
					maxLength={30}
					onChange={this.handleChangeName}
					placeholder='Meal plan name (e.g. 2lb/w Cutting)'
					autoFocus />
				<table>
					<thead>
						<tr>
							<td></td>
							<td className={styles.label}>Calories</td>
							<td className={styles.label}>% P/F/C</td>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className={styles.label}>Target:</td>
							<td>
								<input
									className={styles.targetCalories}
									type='number'
									value={targetCalories}
									onChange={this.handleChangeTargetCalories}
									placeholder='e.g. 2000' />
							</td>
							<td>
								<input
									className={styles.targetPercent}
									type='number'
									value={targetProteinPercent}
									onChange={this.handleChangeTargetProteinPercent} />
								<input
									className={styles.targetPercent}
									type='number'
									value={targetFatPercent}
									onChange={this.handleChangeTargetFatPercent} />
								<input
									className={styles.targetPercent}
									type='number'
									value={targetCarbohydratesPercent}
									onChange={this.handleChangeTargetCarbohydratesPercent} />
							</td>
						</tr>
						<tr>
							<td className={styles.label}>Actual:</td>
							<td>{totalCalories}</td>
							<td>{proteinPercent} / {fatPercent} / {carbohydratesPercent}</td>
						</tr>
					</tbody>
				</table>
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
						{meals.map((meal, i) => this.renderMeal(meal, i))}
						<tr>
							<td colSpan={7}>
								<select onChange={this.handleChangeNewFood} value=''>
									<option value=''>Add food...</option>
									{foods.filter(food => !meals.some(meal => meal.id === food.id)).map((food, i) => (
										<option key={i} value={food.id}>{food.name}</option>
									))}
								</select>
							</td>
						</tr>
					</tbody>
					<tfoot>
						<tr>
							<td className={styles.label} colSpan={3}>Total:</td>
							<td>{Math.round(totalNutrition.protein)}</td>
							<td>{Math.round(totalNutrition.fat)}</td>
							<td>{Math.round(totalNutrition.carbohydrates)}</td>
							<td>{totalCalories}</td>
						</tr>
						<tr>
							<td className={styles.label} colSpan={3}>Target:</td>
							<td>{Math.round(targetProtein)}</td>
							<td>{Math.round(targetFat)}</td>
							<td>{Math.round(targetCarbohydrates)}</td>
							<td>{targetCalories}</td>
						</tr>
					</tfoot>
				</table>
				{submitting &&
					<Banner type='message' display='Submitting meal plan...' />
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
				{!submitting && onClickDelete &&
					<Button className={styles.button} type='danger' display='Delete' onClick={onClickDelete} />
				}
			</Card>
		);
	}

	renderMeal = (meal: IMeal, index: number) => {
		const { foods } = this.props;
		const food = foods.find(food => food.id === meal.id);
		const unitMeasure = food.unitMeasure === '' ? food.name : food.unitMeasure;
		const units = Math.round(meal.quantity * food.unitSize * 10) / 10;
		const protein = Math.round(food.nutrition.protein * meal.quantity * 10) / 10;
		const fat = Math.round(food.nutrition.fat * meal.quantity * 10) / 10;
		const carbohydrates = Math.round(food.nutrition.carbohydrates * meal.quantity * 10) / 10;
		const calories = Math.round(protein * 4 + fat * 9 + carbohydrates * 4);
		return (
			<tr key={index}>
				<td>{food.name}</td>
				<td>
					<input
						className={styles.quantity}
						type='number'
						value={meal.quantity}
						onChange={this.handleChangeQuantity(index)} />
				</td>
				<td>{units} {pluralize(unitMeasure, units)}</td>
				<td>{protein}</td>
				<td>{fat}</td>
				<td>{carbohydrates}</td>
				<td>{calories}</td>
			</tr>
		);
	}
}
