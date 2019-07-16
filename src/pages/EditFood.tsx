import * as React from 'react';
import Card from '~/components/Card';
import Button from '~/components/Button';
import Banner from '~/components/Banner';
import { INutrition } from '~/models';
import * as styles from './EditFood.scss';

interface IEditFoodProps {
	name: string;
	unitSize: number;
	unitMeasure: string;
	siteUrl: string;
	nutrition: INutrition;
	recipes: string[];
	submitting: boolean;
	onUpdateName(name: string): void;
	onUpdateUnitSize(unitSize: number): void;
	onUpdateUnitMeasure(unitMeasure: string): void;
	onUpdateSiteUrl(siteUrl: string): void;
	onUpdateNutrition(nutrition: INutrition): void;
	onClickSubmit(): void;
	onClickCancel(): void;
	onClickDelete?(): void;
}

export default class EditFood extends React.PureComponent<IEditFoodProps> {
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

	handleChangeProtein = (e: React.FormEvent<HTMLInputElement>) => {
		const { nutrition, onUpdateNutrition } = this.props;
		const { fat, carbohydrates } = nutrition;
		onUpdateNutrition({
			protein: +e.currentTarget.value,
			fat,
			carbohydrates
		});
	}

	handleChangeFat = (e: React.FormEvent<HTMLInputElement>) => {
		const { nutrition, onUpdateNutrition } = this.props;
		const { protein, carbohydrates } = nutrition;
		onUpdateNutrition({
			protein,
			fat: +e.currentTarget.value,
			carbohydrates
		});
	}

	handleChangeCarbohydrates = (e: React.FormEvent<HTMLInputElement>) => {
		const { nutrition, onUpdateNutrition } = this.props;
		const { protein, fat } = nutrition;
		onUpdateNutrition({
			protein,
			fat,
			carbohydrates: +e.currentTarget.value
		});
	}

	render() {
		const {
			name,
			unitSize,
			unitMeasure,
			siteUrl,
			nutrition,
			recipes,
			submitting,
			onClickSubmit,
			onClickCancel,
			onClickDelete
		} = this.props;
		const { protein, fat, carbohydrates } = nutrition;
		return (
			<Card className={styles.root}>
				<input
					className={styles.name}
					type='text'
					value={name}
					onChange={this.handleChangeName}
					placeholder='Food name (e.g. Banana)'
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
									placeholder='e.g. http://example.com/banana' />
							</td>
						</tr>
						<tr>
							<td className={styles.label}>Protein (g):</td>
							<td>
								<input
									className={styles.nutrition}
									type='number'
									value={protein}
									onChange={this.handleChangeProtein} />
							</td>
						</tr>
						<tr>
							<td className={styles.label}>Fat (g):</td>
							<td>
								<input
									className={styles.nutrition}
									type='number'
									value={fat}
									onChange={this.handleChangeFat} />
							</td>
						</tr>
						<tr>
							<td className={styles.label}>Carbs (g):</td>
							<td>
								<input
									className={styles.nutrition}
									type='number'
									value={carbohydrates}
									onChange={this.handleChangeCarbohydrates} />
							</td>
						</tr>
					</tbody>
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
				{!submitting && recipes.length === 0 && onClickDelete &&
					<Button className={styles.button} type='danger' display='Delete' onClick={onClickDelete} />
				}
			</Card>
		);
	}
}
