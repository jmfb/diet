import * as React from 'react';
import { browserHistory } from 'react-router';
import Weight from '~/pages/Weight';
import { IWeightRecord } from '~/models';
import { getRecentWeights } from '~/api/weight';

interface IWeightContainerState {
	weights: IWeightRecord[];
	moreWeights: boolean;
	loading: boolean;
}

export default class WeightContainer extends React.PureComponent<void, IWeightContainerState> {
	constructor(props: void) {
		super(props);
		this.state = {
			weights: [],
			moreWeights: false,
			loading: true
		};
	}

	componentDidMount() {
		getRecentWeights(0, 10).then(weights => {
			this.setState({
				weights,
				moreWeights: weights.length === 10,
				loading: false
			});
		});
	}

	handleClickAdd = () => {
		browserHistory.push('/weight/add');
	}

	handleClickImport = () => {
		browserHistory.push('/weight/import');
	}

	handleClickLoadMore = () => {
		this.setState({ loading: true } as IWeightContainerState);
		const { weights } = this.state;
		getRecentWeights(weights.length, 10).then(newWeights => {
			this.setState({
				weights: [...weights, ...newWeights],
				moreWeights: newWeights.length === 10,
				loading: false
			});
		});
	}

	render() {
		const { weights, moreWeights, loading } = this.state;
		return (
			<Weight
				{...{weights, moreWeights, loading}}
				onClickAdd={this.handleClickAdd}
				onClickImport={this.handleClickImport}
				onClickLoadMore={this.handleClickLoadMore}
				/>
		);
	}
}
