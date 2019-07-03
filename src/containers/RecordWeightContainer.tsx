import * as React from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import RecordWeight from '~/pages/RecordWeight';
import WeightApi from '~/api/WeightApi';
import * as moment from 'moment';

interface IRecordWeightContainerState {
	weightInPounds: string;
	submitting: boolean;
}

class RecordWeightContainer extends React.PureComponent<RouteComponentProps, IRecordWeightContainerState> {
	constructor(props: RouteComponentProps) {
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
		const { history } = this.props;
		this.setState({ submitting: true } as IRecordWeightContainerState);
		const { weightInPounds } = this.state;
		WeightApi.updateWeight(moment().format('YYYY-MM-DD'), +weightInPounds).then(() => {
			history.push('/');
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

export default withRouter(RecordWeightContainer);
