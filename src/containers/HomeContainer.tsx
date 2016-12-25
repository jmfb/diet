import * as React from 'react';
import { browserHistory } from 'react-router';
import Home from '~/pages/Home';
import { IProfile, IWeightRecord } from '~/models';
import { getProfile } from '~/api/profiles';
import { getWeights } from '~/api/weight';
import * as moment from 'moment';

interface IHomeContainerState {
	profile: IProfile | null;
	lifetime: IWeightRecord[] | null;
	last30days: IWeightRecord[] | null;
	last7days: IWeightRecord[] | null;
}

export default class HomeContainer extends React.PureComponent<void, IHomeContainerState> {
	constructor(props: void) {
		super(props);
		this.state = {
			profile: null,
			lifetime: null,
			last30days: null,
			last7days: null
		};
	}

	componentDidMount() {
		getProfile().then(profile => {
			this.setState({ profile } as IHomeContainerState);
		});
		getWeights(moment('1900-01-01'), moment().add(1, 'day')).then(weightRecords => {
			this.setState({ lifetime: weightRecords } as IHomeContainerState);
		});
		getWeights(moment().add(-30, 'days'), moment().add(1, 'day')).then(weightRecords => {
			this.setState({ last30days: weightRecords } as IHomeContainerState);
		});
		getWeights(moment().add(-7, 'days'), moment().add(1, 'day')).then(weightRecords => {
			this.setState({ last7days: weightRecords } as IHomeContainerState);
		});
	}

	handleClickLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('name');
		browserHistory.push('/login');
	}

	render() {
		const { profile, lifetime, last30days, last7days } = this.state;
		const name = localStorage.getItem('name');
		return (
			<Home
				{...{name, profile, lifetime, last30days, last7days}}
				onClickLogout={this.handleClickLogout} />
		);
	}
}
