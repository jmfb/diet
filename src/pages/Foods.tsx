import * as React from 'react';
import MealsMenu from '~/components/MealsMenu';
import Banner from '~/components/Banner';
import Button from '~/components/Button';
import Food from '~/components/Food';
import { IFood } from '~/models';
import * as styles from './Foods.scss';

interface IFoodsProps {
	foods: IFood[] | null;
	filter: string;
	onClickCreateFood: () => void;
	onClickCreateRecipe: () => void;
	onUpdateFilter: (filter: string) => void;
}

export default class Foods extends React.PureComponent<IFoodsProps> {
	handleChangeFilter = (e: React.FormEvent<HTMLInputElement>) => {
		const { onUpdateFilter } = this.props;
		onUpdateFilter(e.currentTarget.value);
	}

	render() {
		const { foods, filter, onClickCreateFood, onClickCreateRecipe } = this.props;
		return (
			<div className={styles.root}>
				<MealsMenu />
				<h1>Foods</h1>
				<div className={styles.buttonGroup}>
					<Button className={styles.button} type='primary' display='Create Food' onClick={onClickCreateFood} />
					<Button className={styles.button} type='secondary' display='Create Recipe' onClick={onClickCreateRecipe} />
				</div>
				<div>
					<input
						className={styles.search}
						type='text'
						value={filter}
						onChange={this.handleChangeFilter}
						placeholder='Search for a food item...' />
				</div>
				{foods === null ?
					<Banner type='message' display='Loading foods...' /> :
					foods.map((food, i) => (
						<Food key={i} {...{food}} />
					))
				}
			</div>
		);
	}
}
