import * as React from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import Banner from '~/components/Banner';
import AuthApi from '~/api/AuthApi';
import * as queryString from 'query-string';

class AuthenticateContainer extends React.PureComponent<RouteComponentProps> {
	componentDidMount() {
		const { history } = this.props;
		const { code } = queryString.parse(location.search) as { code: string };
		history.replace('/authenticate');
		AuthApi.login(code).then(loginModel => {
			localStorage.setItem('token', loginModel.token);
			localStorage.setItem('name', loginModel.name);
			history.push('/');
		});
	}

	render() {
		return (
			<div>
				<main>
					<div>
						<Banner type='message' display='Authenticating...' />
					</div>
				</main>
			</div>
		);
	}
}

export default withRouter(AuthenticateContainer);
