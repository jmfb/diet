import * as React from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import EditFood from '~/pages/EditFood';
import EditRecipe from '~/pages/EditRecipe';
import Banner from '~/components/Banner';
import { IFood, INutrition, IIngredient, IPlan } from '~/models';
import { getFoods, getFood, updateRecipe, updateFood, deleteFood } from '~/api/meals';

interface IParams {
	id: string;
}

type IFoodContainerProps = RouteComponentProps<IParams>;

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
	plans: IPlan[];
	submitting: boolean;
}

class FoodContainer extends React.PureComponent<IFoodContainerProps, IFoodContainerState> {
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
			plans: [],
			submitting: false
		};
	}

	componentDidMount() {
		const { match } = this.props;
		const { params } = match;
		getFoods().then(foods => {
			this.setState({ foods } as IFoodContainerState);
		});
		this.loadFood(+params.id);
	}

	componentWillReceiveProps(nextProps: IFoodContainerProps) {
		const { id } = this.state;
		const nextId = +nextProps.match.params.id;
		if (id !== nextId) {
			this.setState({
				id: null,
				name: '',
				unitSize: 0,
				unitMeasure: '',
				siteUrl: '',
				nutrition: null,
				ingredients: [],
				recipes: [],
				plans: [],
				submitting: false
			} as IFoodContainerState);
			this.loadFood(nextId);
		}
	}

	loadFood = (foodId: number) => {
		getFood(foodId).then(food => {
			const { id, name, unitSize, unitMeasure, siteUrl, nutrition, ingredients, recipes, plans } = food;
			this.setState({
				id,
				name,
				unitSize,
				unitMeasure,
				siteUrl,
				nutrition,
				ingredients,
				recipes,
				plans
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
		const { history } = this.props;
		this.setState({ submitting: true } as IFoodContainerState);
		const { id, name, unitSize, unitMeasure, siteUrl, nutrition } = this.state;
		updateFood(id, name, unitSize, unitMeasure, siteUrl, nutrition).then(() => {
			history.push('/meals/foods');
		});
	}

	handleClickCancel = () => {
		const { history } = this.props;
		history.push('/meals/foods');
	}

	handleClickSubmitRecipe = () => {
		const { history } = this.props;
		this.setState({ submitting: true } as IFoodContainerState);
		const { id, name, unitSize, unitMeasure, siteUrl, ingredients } = this.state;
		updateRecipe(id, name, unitSize, unitMeasure, siteUrl, ingredients).then(() => {
			history.push('/meals/foods');
		});
	}

	handleClickCopyRecipe = () => {
		const { history } = this.props;
		this.setState({ submitting: true } as IFoodContainerState);
		const { name, unitSize, unitMeasure, siteUrl, ingredients } = this.state;
		updateRecipe(0, `Copy of ${name}`, unitSize, unitMeasure, siteUrl, ingredients).then(id => {
			history.push(`/meals/foods/${id}`);
		});
	}

	handleClickDelete = () => {
		const { history } = this.props;
		this.setState({ submitting: true } as IFoodContainerState);
		const { id } = this.state;
		deleteFood(id).then(() => {
			history.push('/meals/foods');
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
			plans,
			submitting
		} = this.state;
		if (foods === null || id === null) {
			return <Banner type='message' display='Loading food...' />;
		}

		const recipeNames = recipes
			.filter(recipe => recipe !== id)
			.map(recipe => foods.find(food => food.id === recipe).name)
			.concat(plans.map(plan => plan.name))
			.sort();

		if (nutrition !== null) {
			return (
				<EditFood
					{...{name, unitSize, unitMeasure, siteUrl, nutrition, submitting}}
					recipes={recipeNames}
					onUpdateName={this.handleUpdateName}
					onUpdateUnitSize={this.handleUpdateUnitSize}
					onUpdateUnitMeasure={this.handleUpdateUnitMeasure}
					onUpdateSiteUrl={this.handleUpdateSiteUrl}
					onUpdateNutrition={this.handleUpdateNutrition}
					onClickSubmit={this.handleClickSubmitFood}
					onClickCancel={this.handleClickCancel}
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
				recipes={recipeNames}
				onUpdateName={this.handleUpdateName}
				onUpdateUnitSize={this.handleUpdateUnitSize}
				onUpdateUnitMeasure={this.handleUpdateUnitMeasure}
				onUpdateSiteUrl={this.handleUpdateSiteUrl}
				onAddIngredient={this.handleAddIngredient}
				onUpdateQuantity={this.handleUpdateQuantity}
				onClickSubmit={this.handleClickSubmitRecipe}
				onClickCopy={this.handleClickCopyRecipe}
				onClickCancel={this.handleClickCancel}
				onClickDelete={this.handleClickDelete}
				/>
		);
	}
}

export default withRouter(FoodContainer);
