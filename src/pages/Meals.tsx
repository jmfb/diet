import * as React from 'react';
import Banner from '~/components/Banner';
import PlanSummary from '~/components/PlanSummary';
import * as styles from './Meals.scss';
import { IPlanSummary } from '~/models';

interface IMealsProps {
	plans: IPlanSummary[] | null;
}

export default class Meals extends React.PureComponent<IMealsProps, void> {
	render() {
		const { plans } = this.props;
		return (
			<div className={styles.root}>
				<h1>Meal Plans</h1>
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
