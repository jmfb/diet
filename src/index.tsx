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
import EditWeightContainer from './containers/EditWeightContainer';
import MealsContainer from './containers/MealsContainer';
import CreateMealContainer from './containers/CreateMealContainer';
import MealContainer from './containers/MealContainer';
import FoodsContainer from './containers/FoodsContainer';
import CreateFoodContainer from './containers/CreateFoodContainer';
import CreateRecipeContainer from './containers/CreateRecipeContainer';
import FoodContainer from './containers/FoodContainer';
import * as pluralize from 'pluralize';
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

pluralize.addIrregularRule('slice', 'slices');

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
				<Route path=':when' component={EditWeightContainer} />
			</Route>
			<Route path='meals'>
				<IndexRoute component={MealsContainer} />
				<Route path='foods'>
					<IndexRoute component={FoodsContainer} />
					<Route path='new-food' component={CreateFoodContainer} />
					<Route path='new-recipe' component={CreateRecipeContainer} />
					<Route path=':id' component={FoodContainer} />
				</Route>
				<Route path='new' component={CreateMealContainer} />
				<Route path=':id' component={MealContainer} />
			</Route>
		</Route>
	</Router>,
	document.getElementById('root')
);
