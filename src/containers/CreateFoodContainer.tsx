import * as React from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import EditFood from '~/pages/EditFood';
import { INutrition } from '~/models';
import MealsApi from '~/api/MealsApi';

interface ICreateFoodContainerState {
	name: string;
	unitSize: number;
	unitMeasure: string;
	siteUrl: string;
	nutrition: INutrition;
	submitting: boolean;
}

class CreateFoodContainer extends React.PureComponent<RouteComponentProps, ICreateFoodContainerState> {
	constructor(props: RouteComponentProps) {
		super(props);
		this.state = {
			name: '',
			unitSize: 0,
			unitMeasure: '',
			siteUrl: '',
			nutrition: {
				protein: 0,
				fat: 0,
				carbohydrates: 0
			},
			submitting: false
		};
	}

	handleUpdateName = (name: string) => {
		this.setState({ name } as ICreateFoodContainerState);
	}

	handleUpdateUnitSize = (unitSize: number) => {
		this.setState({ unitSize } as ICreateFoodContainerState);
	}

	handleUpdateUnitMeasure = (unitMeasure: string) => {
		this.setState({ unitMeasure } as ICreateFoodContainerState);
	}

	handleUpdateSiteUrl = (siteUrl: string) => {
		this.setState({ siteUrl } as ICreateFoodContainerState);
	}

	handleUpdateNutrition = (nutrition: INutrition) => {
		this.setState({ nutrition } as ICreateFoodContainerState);
	}

	handleClickSubmit = () => {
		const { history } = this.props;
		this.setState({ submitting: true } as ICreateFoodContainerState);
		const { name, unitSize, unitMeasure, siteUrl, nutrition } = this.state;
		MealsApi.updateFood(0, name, unitSize, unitMeasure, siteUrl, nutrition).then(() => {
			history.push('/meals/foods');
		});
	}

	handleClickCancel = () => {
		const { history } = this.props;
		history.push('/meals/foods');
	}

	render() {
		const { name, unitSize, unitMeasure, siteUrl, nutrition, submitting } = this.state;
		return (
			<EditFood
				{...{name, unitSize, unitMeasure, siteUrl, nutrition, submitting}}
				recipes={[]}
				onUpdateName={this.handleUpdateName}
				onUpdateUnitSize={this.handleUpdateUnitSize}
				onUpdateUnitMeasure={this.handleUpdateUnitMeasure}
				onUpdateSiteUrl={this.handleUpdateSiteUrl}
				onUpdateNutrition={this.handleUpdateNutrition}
				onClickSubmit={this.handleClickSubmit}
				onClickCancel={this.handleClickCancel}
				/>
		);
	}
}

export default withRouter(CreateFoodContainer);
