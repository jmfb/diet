import * as React from 'react';
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

	render() {
		const { plans } = this.state;
		return (
			<Meals {...{plans}} />
		);
	}
}
