import * as React from 'react';
import { browserHistory } from 'react-router';
import EditFood from '~/pages/EditFood';
import { INutrition } from '~/models';
import { updateFood } from '~/api/meals';

interface ICreateFoodContainerState {
	name: string;
	unitSize: number;
	unitMeasure: string;
	siteUrl: string;
	nutrition: INutrition;
	submitting: boolean;
}

export default class CreateFoodContainer extends React.PureComponent<void, ICreateFoodContainerState> {
	constructor(props: void) {
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
		this.setState({ submitting: true } as ICreateFoodContainerState);
		const { name, unitSize, unitMeasure, siteUrl, nutrition } = this.state;
		updateFood(0, name, unitSize, unitMeasure, siteUrl, nutrition).then(() => {
			browserHistory.push('/meals/foods');
		});
	}

	handleClickCancel = () => {
		browserHistory.push('/meals/foods');
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
