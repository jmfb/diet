import * as React from 'react';
import Banner from '~/components/Banner';
import Button from '~/components/Button';
import PlanSummary from '~/components/PlanSummary';
import MealsMenu from '~/components/MealsMenu';
import { IPlanSummary } from '~/models';
import * as styles from './Meals.scss';

interface IMealsProps {
	plans: IPlanSummary[] | null;
	onClickCreatePlan(): void;
}

export default class Meals extends React.PureComponent<IMealsProps> {
	render() {
		const { plans, onClickCreatePlan } = this.props;
		return (
			<div className={styles.root}>
				<MealsMenu />
				<h1>Meal Plans</h1>
				<Button type='primary' display='Create new meal plan' className={styles.option} onClick={onClickCreatePlan} />
				{plans === null ?
					<Banner type='message' display='Loading meal plans...' /> :
					plans.map((plan, i) => (
						<PlanSummary key={i} {...{plan}} />
					))
				}
			</div>
		);
	}
}
