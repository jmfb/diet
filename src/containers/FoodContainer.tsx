import * as React from 'react';
import { browserHistory } from 'react-router';
import EditFood from '~/pages/EditFood';
import EditRecipe from '~/pages/EditRecipe';
import Banner from '~/components/Banner';
import { IFood, INutrition, IIngredient } from '~/models';
import { getFoods, getFood, updateRecipe, updateFood, deleteFood } from '~/api/meals';

interface IFoodContainerProps {
	params: { id: string; };
}

interface IFoodContainerState {
	foods: IFood[] | null;
	id: number | null;
	name: string;
	unitSize: number;
	unitMeasure: string;
	siteUrl: string;
	nutrition: INutrition | null;
	ingredients: IIngredient[];
	recipes: number[];
	submitting: boolean;
}

export default class FoodContainer extends React.PureComponent<IFoodContainerProps, IFoodContainerState> {
	constructor(props: IFoodContainerProps) {
		super(props);
		this.state = {
			foods: null,
			id: null,
			name: '',
			unitSize: 0,
			unitMeasure: '',
			siteUrl: '',
			nutrition: null,
			ingredients: [],
			recipes: [],
			submitting: false
		};
	}

	componentDidMount() {
		const { params } = this.props;
		getFoods().then(foods => {
			this.setState({ foods } as IFoodContainerState);
		});
		getFood(+params.id).then(food => {
			const { id, name, unitSize, unitMeasure, siteUrl, nutrition, ingredients, recipes } = food;
			this.setState({
				id,
				name,
				unitSize,
				unitMeasure,
				siteUrl,
				nutrition,
				ingredients,
				recipes
			} as IFoodContainerState);
		});
	}

	handleUpdateName = (name: string) => {
		this.setState({ name } as IFoodContainerState);
	}

	handleUpdateUnitSize = (unitSize: number) => {
		this.setState({ unitSize } as IFoodContainerState);
	}

	handleUpdateUnitMeasure = (unitMeasure: string) => {
		this.setState({ unitMeasure } as IFoodContainerState);
	}

	handleUpdateSiteUrl = (siteUrl: string) => {
		this.setState({ siteUrl } as IFoodContainerState);
	}

	handleUpdateNutrition = (nutrition: INutrition) => {
		this.setState({ nutrition } as IFoodContainerState);
	}

	handleAddIngredient = (id: number) => {
		const { foods, ingredients } = this.state;
		const newIngredients = [...ingredients, { id, quantity: 1 }]
			.sort((a, b) => foods.findIndex(f => f.id === a.id) - foods.findIndex(f => f.id === b.id));
		this.setState({ ingredients: newIngredients } as IFoodContainerState);
	}

	handleUpdateQuantity = (index: number, quantity: number) => {
		const { ingredients } = this.state;
		const newIngredients = [...ingredients];
		if (quantity === 0) {
			newIngredients.splice(index, 1);
		} else {
			newIngredients[index].quantity = quantity;
		}
		this.setState({ ingredients: newIngredients } as IFoodContainerState);
	}

	handleClickSubmitFood = () => {
		this.setState({ submitting: true } as IFoodContainerState);
		const { name, unitSize, unitMeasure, siteUrl, nutrition } = this.state;
		updateFood(0, name, unitSize, unitMeasure, siteUrl, nutrition).then(() => {
			browserHistory.push('/meals/foods');
		});
	}

	handleClickSubmitRecipe = () => {
		this.setState({ submitting: true } as IFoodContainerState);
		const { id, name, unitSize, unitMeasure, siteUrl, ingredients } = this.state;
		updateRecipe(id, name, unitSize, unitMeasure, siteUrl, ingredients).then(() => {
			browserHistory.push('/meals/foods');
		});
	}

	handleClickDelete = () => {
		this.setState({ submitting: true } as IFoodContainerState);
		const { id } = this.state;
		deleteFood(id).then(() => {
			browserHistory.push('/meals/foods');
		});
	}

	render() {
		const {
			foods,
			id,
			name,
			unitSize,
			unitMeasure,
			siteUrl,
			nutrition,
			ingredients,
			recipes,
			submitting
		} = this.state;
		if (foods === null || id === null) {
			return <Banner type='message' display='Loading food...' />;
		}
		if (nutrition !== null) {
			return (
				<EditFood
					{...{name, unitSize, unitMeasure, siteUrl, nutrition, submitting}}
					onUpdateName={this.handleUpdateName}
					onUpdateUnitSize={this.handleUpdateUnitSize}
					onUpdateUnitMeasure={this.handleUpdateUnitMeasure}
					onUpdateSiteUrl={this.handleUpdateSiteUrl}
					onUpdateNutrition={this.handleUpdateNutrition}
					onClickSubmit={this.handleClickSubmitFood}
					onClickDelete={this.handleClickDelete}
					/>
			);
		}
		const availableIngredients = foods.filter(food =>
			!ingredients.some(ingredient => ingredient.id === food.id) &&
			!recipes.some(recipe => recipe === food.id));
		return (
			<EditRecipe
				{...{foods, availableIngredients, name, unitSize, unitMeasure, siteUrl, ingredients, submitting}}
				onUpdateName={this.handleUpdateName}
				onUpdateUnitSize={this.handleUpdateUnitSize}
				onUpdateUnitMeasure={this.handleUpdateUnitMeasure}
				onUpdateSiteUrl={this.handleUpdateSiteUrl}
				onAddIngredient={this.handleAddIngredient}
				onUpdateQuantity={this.handleUpdateQuantity}
				onClickSubmit={this.handleClickSubmitRecipe}
				onClickDelete={this.handleClickDelete}
				/>
		);
	}
}
