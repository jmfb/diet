import * as React from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import ErrorView from '~/pages/ErrorView';

interface IErrorContainerState {
	status: number;
	statusText: string;
	error: string;
}

class ErrorContainer extends React.PureComponent<RouteComponentProps, IErrorContainerState> {
	constructor(props: RouteComponentProps) {
		super(props);
		const { history } = props;
		this.state = history.location.state as IErrorContainerState;
	}

	handleClickLogout = () => {
		const { history } = this.props;
		localStorage.removeItem('token');
		localStorage.removeItem('name');
		history.push('/login');
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

export default withRouter(ErrorContainer);
