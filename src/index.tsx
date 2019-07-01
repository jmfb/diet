import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Application from './Application';
import LoginContainer from './containers/LoginContainer';
import AuthenticateContainer from './containers/AuthenticateContainer';
import ErrorContainer from './containers/ErrorContainer';
import ApplicationContainer from './containers/ApplicationContainer';
import * as pluralize from 'pluralize';
import './index.scss';

pluralize.addIrregularRule('slice', 'slices');

ReactDOM.render(
	<BrowserRouter>
		<Application>
			<Switch>
				<Route path='/login' component={LoginContainer} />
				<Route path='/authenticate' component={AuthenticateContainer} />
				<Route path='/error' component={ErrorContainer} />
				<Route path='/' component={ApplicationContainer} />
			</Switch>
		</Application>
	</BrowserRouter>,
	document.getElementById('root')
);
