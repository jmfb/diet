import * as React from 'react';
import MealsMenu from '~/components/MealsMenu';
import Banner from '~/components/Banner';
import Button from '~/components/Button';
import Food from '~/components/Food';
import { IFood } from '~/models';
import * as styles from './Foods.scss';

interface IFoodsProps {
	foods: IFood[] | null;
	onClickCreateFood: () => void;
	onClickCreateRecipe: () => void;
}

export default class Foods extends React.PureComponent<IFoodsProps, void> {
	render() {
		const { foods, onClickCreateFood, onClickCreateRecipe } = this.props;
		return (
			<div className={styles.root}>
				<MealsMenu />
				<h1>Foods</h1>
				<div className={styles.buttonGroup}>
					<Button className={styles.button} type='primary' display='Create Food' onClick={onClickCreateFood} />
					<Button className={styles.button} type='secondary' display='Create Recipe' onClick={onClickCreateRecipe} />
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
