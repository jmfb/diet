import * as React from 'react';
import Card from '~/components/Card';
import Button from '~/components/Button';
import Banner from '~/components/Banner';
import { IFood, IIngredient } from '~/models';
import * as pluralize from 'pluralize';
import * as styles from './EditRecipe.scss';

interface IEditRecipeProps {
	foods: IFood[];
	availableIngredients: IFood[];
	name: string;
	unitSize: number;
	unitMeasure: string;
	siteUrl: string;
	ingredients: IIngredient[];
	submitting: boolean;
	onUpdateName: (name: string) => void;
	onUpdateUnitSize: (unitSize: number) => void;
	onUpdateUnitMeasure: (unitMeasure: string) => void;
	onUpdateSiteUrl: (siteUrl: string) => void;
	onAddIngredient: (id: number) => void;
	onUpdateQuantity: (index: number, quantity: number) => void;
	onClickSubmit: () => void;
	onClickDelete?: () => void;
}

export default class EditRecipe extends React.PureComponent<IEditRecipeProps, void> {
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

	render() {
		const {
			availableIngredients,
			name,
			unitSize,
			unitMeasure,
			siteUrl,
			ingredients,
			submitting,
			onClickSubmit,
			onClickDelete
		} = this.props;
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
				</table>
				{submitting ?
					<Banner type='message' display='Submitting food...' /> :
					<Button className={styles.button} type='primary' display='Submit' onClick={onClickSubmit} />
				}
				{!submitting && onClickDelete &&
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
