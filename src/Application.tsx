import * as React from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { History } from 'history';

export let browserHistory: History = null;

class Application extends React.Component<RouteComponentProps> {
	componentWillMount() {
		const { history } = this.props;
		browserHistory = history;
	}

	render() {
		const { children } = this.props;
		return children;
	}
}

export default withRouter(Application);
