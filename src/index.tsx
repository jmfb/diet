import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Application from './Application';
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

pluralize.addIrregularRule('slice', 'slices');

ReactDOM.render(
	<BrowserRouter>
		<Application>
			<Switch>
				<Route path='/login' component={LoginContainer} />
				<Route path='/authenticate' component={AuthenticateContainer} />
				<Route path='/error' component={ErrorContainer} />
				<Route path='/' component={ApplicationContainer}>
					<Switch>
						<Route exact path='' component={HomeContainer} />
						<Route path='profile' component={ProfileContainer} />
						<Route path='weight'>
							<Switch>
								<Route exact path='' component={WeightContainer} />
								<Route path='add' component={RecordWeightContainer} />
								<Route path='import' component={ImportContainer} />
								<Route path=':when' component={EditWeightContainer} />
							</Switch>
						</Route>
						<Route path='meals'>
							<Switch>
								<Route exact path='' component={MealsContainer} />
								<Route path='foods'>
									<Switch>
										<Route exact path='' component={FoodsContainer} />
										<Route path='new-food' component={CreateFoodContainer} />
										<Route path='new-recipe' component={CreateRecipeContainer} />
										<Route path=':id' component={FoodContainer} />
									</Switch>
								</Route>
								<Route path='new' component={CreateMealContainer} />
								<Route path=':id' component={MealContainer} />
							</Switch>
						</Route>
					</Switch>
				</Route>
			</Switch>
		</Application>
	</BrowserRouter>,
	document.getElementById('root')
);
