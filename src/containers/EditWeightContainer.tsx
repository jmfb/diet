import * as React from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import RecordWeight from '~/pages/RecordWeight';
import Banner from '~/components/Banner';
import { getWeights, updateWeight, deleteWeight } from '~/api/weight';
import * as moment from 'moment';

interface IParams {
	when: string;
}

type IEditWeightContainerProps = RouteComponentProps<IParams>;

interface IEditWeightContainerState {
	when: string | null;
	weightInPounds: string;
	submitting: boolean;
}

class EditWeightContainer extends React.PureComponent<IEditWeightContainerProps, IEditWeightContainerState> {
	constructor(props: IEditWeightContainerProps) {
		super(props);
		this.state = {
			when: null,
			weightInPounds: '',
			submitting: false
		};
	}

	componentDidMount() {
		const { match } = this.props;
		const { params } = match;
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
		const { history } = this.props;
		this.setState({ submitting: true } as IEditWeightContainerState);
		const { when, weightInPounds } = this.state;
		updateWeight(when, +weightInPounds).then(() => {
			history.push('/weight');
		});
	}

	handleClickDelete = () => {
		const { history } = this.props;
		this.setState({ submitting: true } as IEditWeightContainerState);
		const { when } = this.state;
		deleteWeight(when).then(() => {
			history.push('/weight');
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

export default withRouter(EditWeightContainer);
