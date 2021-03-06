import * as React from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import EditRecipe from '~/pages/EditRecipe';
import { IIngredient, IFood } from '~/models';
import MealsApi from '~/api/MealsApi';

interface ICreateRecipeContainerState {
	foods: IFood[];
	name: string;
	unitSize: number;
	unitMeasure: string;
	siteUrl: string;
	ingredients: IIngredient[];
	submitting: boolean;
}

class CreateRecipeContainer extends React.PureComponent<RouteComponentProps, ICreateRecipeContainerState> {
	constructor(props: RouteComponentProps) {
		super(props);
		this.state = {
			foods: [],
			name: '',
			unitSize: 0,
			unitMeasure: '',
			siteUrl: '',
			ingredients: [],
			submitting: false
		};
	}

	componentDidMount() {
		MealsApi.getFoods().then(foods => {
			this.setState({ foods } as ICreateRecipeContainerState);
		});
	}

	handleUpdateName = (name: string) => {
		this.setState({ name } as ICreateRecipeContainerState);
	}

	handleUpdateUnitSize = (unitSize: number) => {
		this.setState({ unitSize } as ICreateRecipeContainerState);
	}

	handleUpdateUnitMeasure = (unitMeasure: string) => {
		this.setState({ unitMeasure } as ICreateRecipeContainerState);
	}

	handleUpdateSiteUrl = (siteUrl: string) => {
		this.setState({ siteUrl } as ICreateRecipeContainerState);
	}

	handleAddIngredient = (id: number) => {
		const { foods, ingredients } = this.state;
		const newIngredients = [...ingredients, { id, quantity: 1 }]
			.sort((a, b) => foods.findIndex(f => f.id === a.id) - foods.findIndex(f => f.id === b.id));
		this.setState({ ingredients: newIngredients } as ICreateRecipeContainerState);
	}

	handleUpdateQuantity = (index: number, quantity: number) => {
		const { ingredients } = this.state;
		const newIngredients = [...ingredients];
		if (quantity === 0) {
			newIngredients.splice(index, 1);
		} else {
			newIngredients[index].quantity = quantity;
		}
		this.setState({ ingredients: newIngredients } as ICreateRecipeContainerState);
	}

	handleClickSubmit = () => {
		const { history } = this.props;
		this.setState({ submitting: true } as ICreateRecipeContainerState);
		const { name, unitSize, unitMeasure, siteUrl, ingredients } = this.state;
		MealsApi.updateRecipe(0, name, unitSize, unitMeasure, siteUrl, ingredients).then(() => {
			history.push('/meals/foods');
		});
	}

	handleClickCancel = () => {
		const { history } = this.props;
		history.push('/meals/foods');
	}

	render() {
		const { foods, name, unitSize, unitMeasure, siteUrl, ingredients, submitting } = this.state;
		const availableIngredients = foods.filter(food => !ingredients.some(ingredient => ingredient.id === food.id));
		return (
			<EditRecipe
				{...{foods, availableIngredients, name, unitSize, unitMeasure, siteUrl, ingredients, submitting}}
				recipes={[]}
				onUpdateName={this.handleUpdateName}
				onUpdateUnitSize={this.handleUpdateUnitSize}
				onUpdateUnitMeasure={this.handleUpdateUnitMeasure}
				onUpdateSiteUrl={this.handleUpdateSiteUrl}
				onAddIngredient={this.handleAddIngredient}
				onUpdateQuantity={this.handleUpdateQuantity}
				onClickSubmit={this.handleClickSubmit}
				onClickCancel={this.handleClickCancel}
				/>
		);
	}
}

export default withRouter(CreateRecipeContainer);
