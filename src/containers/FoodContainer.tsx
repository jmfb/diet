import * as React from 'react';

interface IFoodContainerProps {
	params: { id: string; };
}

interface IFoodContainerState {
}

export default class FoodContainer extends React.PureComponent<IFoodContainerProps, IFoodContainerState> {
	constructor(props: IFoodContainerProps) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<h1>Food {this.props.params.id}</h1>
		);
	}
}
