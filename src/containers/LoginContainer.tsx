import * as React from 'react';
import Login from '~/pages/Login';
import AuthApi from '~/api/AuthApi';

interface ILoginContainerState {
	signingIn: boolean;
}

export default class LoginContainer extends React.PureComponent<{}, ILoginContainerState> {
	constructor(props: {}) {
		super(props);
		this.state = { signingIn: false };
	}

	handleClickSignIn = () => {
		this.setState({ signingIn: true });
		AuthApi.getAuthenticationUrl().then(url => {
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
