import * as React from 'react';
import { browserHistory } from 'react-router';
import RecordWeight from '~/pages/RecordWeight';
import { updateWeight } from '~/api/weight';
import * as moment from 'moment';

interface IRecordWeightContainerState {
	weightInPounds: string;
	submitting: boolean;
}

export default class RecordWeightContainer extends React.PureComponent<void, IRecordWeightContainerState> {
	constructor(props: void) {
		super(props);
		this.state = {
			submitting: false,
			weightInPounds: ''
		};
	}

	handleUpdateWeight = (weightInPounds: string) => {
		this.setState({ weightInPounds } as IRecordWeightContainerState);
	}

	handleClickSubmit = () => {
		this.setState({ submitting: true } as IRecordWeightContainerState);
		const { weightInPounds } = this.state;
		updateWeight(moment().format('YYYY-MM-DD'), +weightInPounds).then(() => {
			browserHistory.push('/');
		});
	}

	render() {
		const { submitting, weightInPounds } = this.state;
		return (
			<RecordWeight
				{...{submitting, weightInPounds}}
				onUpdateWeight={this.handleUpdateWeight}
				onClickSubmit={this.handleClickSubmit} />
		);
	}
}
