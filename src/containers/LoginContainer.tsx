import * as React from 'react';
import Login from '~/pages/Login';
import { getAuthenticationUrl } from '~/api/auth';

interface ILoginContainerState {
	signingIn: boolean;
}

export default class LoginContainer extends React.PureComponent<void, ILoginContainerState> {
	constructor(props: void) {
		super(props);
		this.state = { signingIn: false };
	}

	handleClickSignIn = () => {
		this.setState({ signingIn: true });
		getAuthenticationUrl().then(url => {
			window.location.href = url;
		});
	}

	render() {
		const { signingIn } = this.state;
		return (
			<Login
				{...{signingIn}}
				onClickSignIn={this.handleClickSignIn} />
		);
	}
}
