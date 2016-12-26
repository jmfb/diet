import * as React from 'react';
import { Link } from 'react-router';
import Card from './Card';
import { IPlanSummary } from '~/models';
import * as styles from './PlanSummary.scss';

interface IPlanSummaryProps {
	plan: IPlanSummary;
}

export default class PlanSummary extends React.PureComponent<IPlanSummaryProps, void> {
	render() {
		const { plan } = this.props;
		const { target, actual } = plan;
		const targetCalories = Math.round(4 * target.protein + 4 * target.carbohydrates + 9 * target.fat);
		const actualCalories = Math.round(4 * actual.protein + 4 * actual.carbohydrates + 9 * actual.fat);
		const calorieDifference = actualCalories - targetCalories;

		const targetProteinPercent = Math.round(4 * target.protein * 100 / targetCalories);
		const targetCarbohydratePercent = Math.round(4 * target.carbohydrates * 100 / targetCalories);
		const targetFatPercent = 100 - targetProteinPercent - targetCarbohydratePercent;

		const actualProteinPercent = Math.round(4 * actual.protein * 100 / actualCalories);
		const actualCarbohydratePercent = Math.round(4 * actual.carbohydrates * 100 / actualCalories);
		const actualFatPercent = 100 - actualProteinPercent - actualCarbohydratePercent;

		return (
			<Card className={styles.root}>
				<h2 className={styles.name}><Link to={`/meals/${plan.id}`}>{plan.name}</Link></h2>
				<div className={styles.table}>
					<div className={styles.row}>
						<div className={styles.label}></div>
						<div className={styles.label}>Calories</div>
						<div className={styles.label}>% P/F/C</div>
					</div>
					<div className={styles.row}>
						<div className={styles.label}>Target:</div>
						<div className={styles.value}>{targetCalories}</div>
						<div className={styles.value}>{targetProteinPercent}/{targetFatPercent}/{targetCarbohydratePercent}</div>
					</div>
					<div className={styles.row}>
						<div className={styles.label}>Actual:</div>
						<div className={styles.value}>{actualCalories} ({this.renderCalorieDifference(calorieDifference)})</div>
						<div className={styles.value}>{actualProteinPercent}/{actualFatPercent}/{actualCarbohydratePercent}</div>
					</div>
				</div>
			</Card>
		);
	}

	renderCalorieDifference = (calorieDifference: number) => {
		return calorieDifference < 0 ?
			<span className={styles.negative}>{calorieDifference}</span> :
			<span className={styles.positive}>+{calorieDifference}</span>;
	}
}
