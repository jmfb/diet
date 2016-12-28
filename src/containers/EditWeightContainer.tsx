import * as React from 'react';
import { browserHistory } from 'react-router';
import RecordWeight from '~/pages/RecordWeight';
import Banner from '~/components/Banner';
import { getWeights, updateWeight, deleteWeight } from '~/api/weight';
import * as moment from 'moment';

interface IEditWeightContainerProps {
	params: { when: string; };
}

interface IEditWeightContainerState {
	when: string | null;
	weightInPounds: string;
	submitting: boolean;
}

export default class EditWeightContainer extends React.PureComponent<IEditWeightContainerProps, IEditWeightContainerState> {
	constructor(props: IEditWeightContainerProps) {
		super(props);
		this.state = {
			when: null,
			weightInPounds: '',
			submitting: false
		};
	}

	componentDidMount() {
		const { params } = this.props;
		const when = moment(params.when);
		getWeights(moment(params.when), when.add(1, 'day')).then(weights => {
			const { when, weightInPounds } = weights[0];
			this.setState({
				when,
				weightInPounds: weightInPounds.toString()
			} as IEditWeightContainerState);
		});
	}

	handleUpdateWeight = (weightInPounds: string) => {
		this.setState({ weightInPounds } as IEditWeightContainerState);
	}

	handleClickSubmit = () => {
		this.setState({ submitting: true } as IEditWeightContainerState);
		const { when, weightInPounds } = this.state;
		updateWeight(when, +weightInPounds).then(() => {
			browserHistory.push('/weight');
		});
	}

	handleClickDelete = () => {
		this.setState({ submitting: true } as IEditWeightContainerState);
		const { when } = this.state;
		deleteWeight(when).then(() => {
			browserHistory.push('/weight');
		});
	}

	render() {
		const { when, weightInPounds, submitting } = this.state;
		return when === null ?
			<Banner type='message' display='Loading weight record...' /> : (
			<RecordWeight
				{...{weightInPounds, submitting}}
				onUpdateWeight={this.handleUpdateWeight}
				onClickSubmit={this.handleClickSubmit}
				onClickDelete={this.handleClickDelete}
				/>
		);
	}
}
