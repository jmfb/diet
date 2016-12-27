import * as React from 'react';
import { browserHistory } from 'react-router';
import Meals from '~/pages/Meals';
import { IPlanSummary } from '~/models';
import { getPlans } from '~/api/meals';

interface IMealsContainerState {
	plans: IPlanSummary[] | null;
}

export default class MealsContainer extends React.PureComponent<void, IMealsContainerState> {
	constructor(props: void) {
		super(props);
		this.state = { plans: null };
	}

	componentDidMount() {
		getPlans().then(plans => {
			this.setState({ plans });
		});
	}

	handleClickCreatePlan = () => {
		browserHistory.push('/meals/new');
	}

	render() {
		const { plans } = this.state;
		return (
			<Meals
				{...{plans}}
				onClickCreatePlan={this.handleClickCreatePlan} />
		);
	}
}
