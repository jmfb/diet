import * as React from 'react';
import { browserHistory } from 'react-router';
import Home from '~/pages/Home';
import { IProfile } from '~/models';
import { getProfile } from '~/api/profiles';

interface IHomeContainerState {
	profile: IProfile | null;
}

export default class HomeContainer extends React.PureComponent<void, IHomeContainerState> {
	constructor(props: void) {
		super(props);
		this.state = {
			profile: null
		};
	}

	componentDidMount() {
		getProfile().then(profile => {
			this.setState({ profile });
		});
	}

	handleClickImport = () => {
		browserHistory.push('/import');
	}

	handleClickLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('name');
		browserHistory.push('/login');
	}

	render() {
		const { profile } = this.state;
		const name = localStorage.getItem('name');
		return (
			<Home
				{...{name, profile}}
				onClickImport={this.handleClickImport}
				onClickLogout={this.handleClickLogout} />
		);
	}
}
