import * as React from 'react';
import { browserHistory } from 'react-router';
import Weight from '~/pages/Weight';

interface IWeightContainerState {
}

export default class WeightContainer extends React.PureComponent<void, IWeightContainerState> {
	constructor(props: void) {
		super(props);
		this.state = {};
	}

	handleClickAdd = () => {
		browserHistory.push('/weight/add');
	}

	handleClickImport = () => {
		browserHistory.push('/weight/import');
	}

	render() {
		return (
			<Weight
				onClickAdd={this.handleClickAdd}
				onClickImport={this.handleClickImport} />
		);
	}
}
