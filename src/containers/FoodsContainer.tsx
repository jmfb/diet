import * as React from 'react';
import { browserHistory } from 'react-router';
import Foods from '~/pages/Foods';
import { IFood } from '~/models';
import { getFoods } from '~/api/meals';

interface IFoodsContainerState {
	foods: IFood[] | null;
	filter: string;
}

export default class FoodsContainer extends React.PureComponent<void, IFoodsContainerState> {
	constructor(props: void) {
		super(props);
		this.state = {
			foods: null,
			filter: ''
		};
	}

	componentDidMount() {
		getFoods().then(foods => {
			this.setState({ foods } as IFoodsContainerState);
		});
	}

	handleCreateFood = () => {
		browserHistory.push('/meals/foods/new-food');
	}

	handleCreateRecipe = () => {
		browserHistory.push('/meals/foods/new-recipe');
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
