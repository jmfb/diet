import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
	Router,
	Route,
	IndexRoute,
	RouterState,
	RedirectFunction,
	browserHistory
} from 'react-router';
import LoginContainer from './containers/LoginContainer';
import AuthenticateContainer from './containers/AuthenticateContainer';
import ErrorContainer from './containers/ErrorContainer';
import ApplicationContainer from './containers/ApplicationContainer';
import HomeContainer from './containers/HomeContainer';
import ProfileContainer from './containers/ProfileContainer';
import WeightContainer from './containers/WeightContainer';
import RecordWeightContainer from './containers/RecordWeightContainer';
import ImportContainer from './containers/ImportContainer';
import './index.scss';

function authenticate(nextState: RouterState, redirect: RedirectFunction) {
	if (localStorage.getItem('name') == null) {
		localStorage.removeItem('token');
	}
	if (localStorage.getItem('token') == null) {
		redirect({
			pathname: '/login',
			state: { returnTo: nextState.location.pathname }
		});
	}
};

ReactDOM.render(
	<Router history={browserHistory}>
		<Route path='/login' component={LoginContainer} />
		<Route path='/authenticate' component={AuthenticateContainer} />
		<Route path='/error' component={ErrorContainer} />
		<Route path='/' component={ApplicationContainer} onEnter={authenticate}>
			<IndexRoute component={HomeContainer} />
			<Route path='profile' component={ProfileContainer} />
			<Route path='weight'>
				<IndexRoute component={WeightContainer} />
				<Route path='add' component={RecordWeightContainer} />
				<Route path='import' component={ImportContainer} />
			</Route>
		</Route>
	</Router>,
	document.getElementById('root')
);
