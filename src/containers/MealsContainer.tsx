import * as React from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import Meals from '~/pages/Meals';
import { IPlanSummary } from '~/models';
import MealsApi from '~/api/MealsApi';

interface IMealsContainerState {
	plans: IPlanSummary[] | null;
}

class MealsContainer extends React.PureComponent<RouteComponentProps, IMealsContainerState> {
	constructor(props: RouteComponentProps) {
		super(props);
		this.state = { plans: null };
	}

	componentDidMount() {
		MealsApi.getPlans().then(plans => {
			this.setState({ plans });
		});
	}

	handleClickCreatePlan = () => {
		const { history } = this.props;
		history.push('/meals/new');
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

export default withRouter(MealsContainer);
