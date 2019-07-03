import * as React from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import Weight from '~/pages/Weight';
import { IWeightRecord } from '~/models';
import WeightApi from '~/api/WeightApi';

interface IWeightContainerState {
	weights: IWeightRecord[];
	moreWeights: boolean;
	loading: boolean;
}

class WeightContainer extends React.PureComponent<RouteComponentProps, IWeightContainerState> {
	constructor(props: RouteComponentProps) {
		super(props);
		this.state = {
			weights: [],
			moreWeights: false,
			loading: true
		};
	}

	componentDidMount() {
		WeightApi.getRecentWeights(0, 10).then(weights => {
			this.setState({
				weights,
				moreWeights: weights.length === 10,
				loading: false
			});
		});
	}

	handleClickAdd = () => {
		const { history } = this.props;
		history.push('/weight/add');
	}

	handleClickImport = () => {
		const { history } = this.props;
		history.push('/weight/import');
	}

	handleClickLoadMore = () => {
		this.setState({ loading: true } as IWeightContainerState);
		const { weights } = this.state;
		WeightApi.getRecentWeights(weights.length, 10).then(newWeights => {
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

export default withRouter(WeightContainer);
