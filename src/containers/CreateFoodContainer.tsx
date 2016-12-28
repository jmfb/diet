import * as React from 'react';

interface ICreateFoodContainerState {
}

export default class CreateFoodContainer extends React.PureComponent<void, ICreateFoodContainerState> {
	constructor(props: void) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<h1>Create Food</h1>
		);
	}
}
