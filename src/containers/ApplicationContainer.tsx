import * as React from 'react';
import { withRouter, Redirect, Switch, Route } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import NavBar from '~/components/NavBar';
import HomeContainer from './HomeContainer';
import ProfileContainer from './ProfileContainer';
import WeightContainer from './WeightContainer';
import RecordWeightContainer from './RecordWeightContainer';
import ImportContainer from './ImportContainer';
import EditWeightContainer from './EditWeightContainer';
import MealsContainer from './MealsContainer';
import CreateMealContainer from './CreateMealContainer';
import MealContainer from './MealContainer';
import FoodsContainer from './FoodsContainer';
import CreateFoodContainer from './CreateFoodContainer';
import CreateRecipeContainer from './CreateRecipeContainer';
import FoodContainer from './FoodContainer';

interface IApplicationContainerState {
	redirectToLogin: boolean;
}

class ApplicationContainer extends React.Component<RouteComponentProps, IApplicationContainerState> {
	constructor(props: RouteComponentProps) {
		super(props);
		this.state = {
			redirectToLogin: false
		};
	}

	componentWillMount() {
		if (localStorage.getItem('name') == null) {
			localStorage.removeItem('token');
		}
		if (localStorage.getItem('token') == null) {
			this.setState({ redirectToLogin: true });
		}
	}

	render() {
		const { history } = this.props;
		const { redirectToLogin } = this.state;
		if (redirectToLogin) {
			const redirectTo = {
				pathname: '/login',
				state: { returnTo: history.location.pathname }
			};
			return (
				<Redirect to={redirectTo} />
			);
		}
		return (
			<div>
				<NavBar />
				<main>
					<Switch>
						<Route exact path='/' component={HomeContainer} />
						<Route path='/profile' component={ProfileContainer} />
						<Route exact path='/weight' component={WeightContainer} />
						<Route path='/weight/add' component={RecordWeightContainer} />
						<Route path='/weight/import' component={ImportContainer} />
						<Route path='/weight/:when' component={EditWeightContainer} />
						<Route exact path='/meals' component={MealsContainer} />
						<Route exact path='/meals/foods' component={FoodsContainer} />
						<Route path='/meals/foods/new-food' component={CreateFoodContainer} />
						<Route path='/meals/foods/new-recipe' component={CreateRecipeContainer} />
						<Route path='/meals/foods/:id' component={FoodContainer} />
						<Route path='/meals/new' component={CreateMealContainer} />
						<Route path='/meals/:id' component={MealContainer} />
					</Switch>
				</main>
			</div>
		);
	}
}

export default withRouter(ApplicationContainer);
