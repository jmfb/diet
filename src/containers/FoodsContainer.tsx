import * as React from 'react';
import { browserHistory } from 'react-router';
import Foods from '~/pages/Foods';
import { IFood } from '~/models';
import { getFoods } from '~/api/meals';

interface IFoodsContainerState {
	foods: IFood[] | null;
}

export default class FoodsContainer extends React.PureComponent<void, IFoodsContainerState> {
	constructor(props: void) {
		super(props);
		this.state = { foods: null };
	}

	componentDidMount() {
		getFoods().then(foods => {
			this.setState({ foods });
		});
	}

	handleCreateFood = () => {
		browserHistory.push('/meals/foods/new-food');
	}

	handleCreateRecipe = () => {
		browserHistory.push('/meals/foods/new-recipe');
	}

	render() {
		const { foods } = this.state;
		return (
			<Foods
				{...{foods}}
				onClickCreateFood={this.handleCreateFood}
				onClickCreateRecipe={this.handleCreateRecipe}
				/>
		);
	}
}
