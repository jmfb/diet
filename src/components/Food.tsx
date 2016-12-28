import * as React from 'react';
import { Link } from 'react-router';
import Card from './Card';
import { IFood } from '~/models';
import * as pluralize from 'pluralize';
import * as styles from './Food.scss';

interface IFoodProps {
	food: IFood;
}

export default class Food extends React.PureComponent<IFoodProps, void> {
	render() {
		const { food } = this.props;
		const { id, name, unitSize, unitMeasure, siteUrl, nutrition } = food;
		const { protein, fat, carbohydrates } = nutrition;
		const calories = Math.round(protein * 4 + fat * 9 + carbohydrates * 4);
		return (
			<Card className={styles.root}>
				<h2 className={styles.name}><Link to={`/meals/foods/${id}`}>{name}</Link></h2>
				<div>
					<span className={styles.span}>
						{calories} cal. per {unitSize} {pluralize(unitMeasure === '' ? name : unitMeasure, unitSize)}
					</span>
					<span className={styles.span}>
						({protein}g Protein / {fat}g Fat / {carbohydrates}g Carbs)
					</span>
					{siteUrl !== '' &&
						<span className={styles.span}><a href={siteUrl}>Site</a></span>
					}
				</div>
			</Card>
		);
	}
}
