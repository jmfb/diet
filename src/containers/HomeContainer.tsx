import * as React from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import Home from '~/pages/Home';
import { IProfile, IWeightRecord } from '~/models';
import ProfilesApi from '~/api/ProfilesApi';
import WeightApi from '~/api/WeightApi';
import * as moment from 'moment';

interface IHomeContainerState {
	profile: IProfile | null;
	lifetime: IWeightRecord[] | null;
	last30days: IWeightRecord[] | null;
	last7days: IWeightRecord[] | null;
}

class HomeContainer extends React.PureComponent<RouteComponentProps, IHomeContainerState> {
	constructor(props: RouteComponentProps) {
		super(props);
		this.state = {
			profile: null,
			lifetime: null,
			last30days: null,
			last7days: null
		};
	}

	componentDidMount() {
		ProfilesApi.getProfile().then(profile => {
			this.setState({ profile } as IHomeContainerState);
		});
		WeightApi.getWeights(moment('1900-01-01'), moment().add(1, 'day')).then(weightRecords => {
			this.setState({ lifetime: weightRecords } as IHomeContainerState);
		});
		WeightApi.getWeights(moment().add(-30, 'days'), moment().add(1, 'day')).then(weightRecords => {
			this.setState({ last30days: weightRecords } as IHomeContainerState);
		});
		WeightApi.getWeights(moment().add(-7, 'days'), moment().add(1, 'day')).then(weightRecords => {
			this.setState({ last7days: weightRecords } as IHomeContainerState);
		});
	}

	handleClickProfile = () => {
		const { history } = this.props;
		history.push('/profile');
	}

	handleClickLogout = () => {
		const { history } = this.props;
		localStorage.removeItem('token');
		localStorage.removeItem('name');
		history.push('/login');
	}

	handleClickRecordWeight = () => {
		const { history } = this.props;
		history.push('/weight/add');
	}

	render() {
		const { profile, lifetime, last30days, last7days } = this.state;
		const name = localStorage.getItem('name');
		return (
			<Home
				{...{name, profile, lifetime, last30days, last7days}}
				onClickProfile={this.handleClickProfile}
				onClickLogout={this.handleClickLogout}
				onClickRecordWeight={this.handleClickRecordWeight}
				/>
		);
	}
}

export default withRouter(HomeContainer);
