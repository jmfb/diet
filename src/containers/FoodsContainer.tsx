import * as React from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import Foods from '~/pages/Foods';
import { IFood } from '~/models';
import MealsApi from '~/api/MealsApi';

interface IFoodsContainerState {
	foods: IFood[] | null;
	filter: string;
}

class FoodsContainer extends React.PureComponent<RouteComponentProps, IFoodsContainerState> {
	constructor(props: RouteComponentProps) {
		super(props);
		this.state = {
			foods: null,
			filter: ''
		};
	}

	componentDidMount() {
		MealsApi.getFoods().then(foods => {
			this.setState({ foods } as IFoodsContainerState);
		});
	}

	handleCreateFood = () => {
		const { history } = this.props;
		history.push('/meals/foods/new-food');
	}

	handleCreateRecipe = () => {
		const { history } = this.props;
		history.push('/meals/foods/new-recipe');
	}

	handleUpdateFilter = (filter: string) => {
		this.setState({ filter } as IFoodsContainerState);
	}

	render() {
		const { foods, filter } = this.state;
		const filteredFoods = foods === null ?
			null :
			foods.filter(food => filter === '' || food.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0);
		return (
			<Foods
				{...{filter}}
				foods={filteredFoods}
				onClickCreateFood={this.handleCreateFood}
				onClickCreateRecipe={this.handleCreateRecipe}
				onUpdateFilter={this.handleUpdateFilter}
				/>
		);
	}
}

export default withRouter(FoodsContainer);
