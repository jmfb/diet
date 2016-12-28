import * as React from 'react';

interface ICreateRecipeContainerState {
}

export default class CreateRecipeContainer extends React.PureComponent<void, ICreateRecipeContainerState> {
	constructor(props: void) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<h1>Create Recipe</h1>
		);
	}
}
