import * as React from 'react';
import { browserHistory } from 'react-router';
import ErrorView from '~/pages/ErrorView';

interface IErrorContainerState {
	status: number;
	statusText: string;
	error: any;
}

export default class ErrorContainer extends React.PureComponent<void, IErrorContainerState> {
	constructor(props: void) {
		super(props);
		this.state = browserHistory.getCurrentLocation().state as IErrorContainerState;
	}

	handleClickLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('name');
		browserHistory.push('/login');
	}

	render() {
		const { status, statusText, error } = this.state;
		return (
			<ErrorView
				{...{status, statusText, error}}
				onClickLogout={this.handleClickLogout} />
		);
	}
}
