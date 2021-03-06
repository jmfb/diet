import * as React from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import EditMeal from '~/pages/EditMeal';
import { IFood, IMeal } from '~/models';
import MealsApi from '~/api/MealsApi';

interface ICreateMealContainerState {
	foods: IFood[];
	name: string;
	targetCalories: number;
	targetProteinPercent: number;
	targetCarbohydratesPercent: number;
	targetFatPercent: number;
	meals: IMeal[];
	submitting: boolean;
}

class CreateMealContainer extends React.PureComponent<RouteComponentProps, ICreateMealContainerState> {
	constructor(props: RouteComponentProps) {
		super(props);
		this.state = {
			foods: [],
			name: '',
			targetCalories: 2000,
			targetProteinPercent: 40,
			targetCarbohydratesPercent: 30,
			targetFatPercent: 30,
			meals: [],
			submitting: false
		};
	}

	componentDidMount() {
		MealsApi.getFoods().then(foods => {
			this.setState({ foods } as ICreateMealContainerState);
		});
	}

	handleUpdateName = (name: string) => {
		this.setState({ name } as ICreateMealContainerState);
	}

	handleUpdateTargetCalories = (targetCalories: number) => {
		this.setState({ targetCalories } as ICreateMealContainerState);
	}

	handleUpdateTargetPercent = (proteinPercent: number, carbohydratesPercent: number, fatPercent: number) => {
		this.setState({
			targetProteinPercent: proteinPercent,
			targetCarbohydratesPercent: carbohydratesPercent,
			targetFatPercent: fatPercent
		} as ICreateMealContainerState);
	}

	handleAddMeal = (id: number) => {
		const { foods, meals } = this.state;
		const newMeals = [...meals, { id, quantity: 1 }]
			.sort((a, b) => foods.findIndex(f => f.id === a.id) - foods.findIndex(f => f.id === b.id));
		this.setState({ meals: newMeals } as ICreateMealContainerState);
	}

	handleUpdateQuantity = (index: number, quantity: number) => {
		const { meals } = this.state;
		const newMeals = [...meals];
		if (quantity <= 0) {
			newMeals.splice(index, 1);
		} else {
			newMeals[index].quantity = quantity;
		}
		this.setState({ meals: newMeals } as ICreateMealContainerState);
	}

	handleClickSubmit = () => {
		const { history } = this.props;
		this.setState({ submitting: true } as ICreateMealContainerState);
		const { name, targetCalories, targetProteinPercent, targetCarbohydratesPercent, targetFatPercent, meals } = this.state;
		const target = {
			protein: targetCalories * targetProteinPercent / 100 / 4,
			carbohydrates: targetCalories * targetCarbohydratesPercent / 100 / 4,
			fat: targetCalories * targetFatPercent / 100 / 9
		};
		MealsApi.updatePlan(0, name, target, meals).then(() => {
			history.push('/meals');
		});
	}

	handleClickCancel = () => {
		const { history } = this.props;
		history.push('/meals');
	}

	render() {
		const {
			foods,
			name,
			targetCalories,
			targetProteinPercent,
			targetCarbohydratesPercent,
			targetFatPercent,
			meals,
			submitting
		} = this.state;
		return (
			<EditMeal
				{...{
					foods,
					name,
					targetCalories,
					targetProteinPercent,
					targetCarbohydratesPercent,
					targetFatPercent,
					meals,
					submitting
				}}
				onUpdateName={this.handleUpdateName}
				onUpdateTargetCalories={this.handleUpdateTargetCalories}
				onUpdateTargetPercent={this.handleUpdateTargetPercent}
				onAddMeal={this.handleAddMeal}
				onUpdateQuantity={this.handleUpdateQuantity}
				onClickSubmit={this.handleClickSubmit}
				onClickCancel={this.handleClickCancel}
				/>
		);
	}
}

export default withRouter(CreateMealContainer);
