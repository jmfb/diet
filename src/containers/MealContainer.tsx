import * as React from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import Banner from '~/components/Banner';
import EditMeal from '~/pages/EditMeal';
import { IFood, IMeal } from '~/models';
import MealsApi from '~/api/MealsApi';

interface IParams {
	id: string;
}

type IMealContainerProps = RouteComponentProps<IParams>;

interface IMealContainerState {
	foods: IFood[] | null;
	id: number | null;
	name: string;
	targetCalories: number;
	targetProteinPercent: number;
	targetCarbohydratesPercent: number;
	targetFatPercent: number;
	meals: IMeal[];
	submitting: boolean;
}

class MealContainer extends React.PureComponent<IMealContainerProps, IMealContainerState> {
	constructor(props: IMealContainerProps) {
		super(props);
		this.state = {
			foods: null,
			id: null,
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
		const { match } = this.props;
		const { params } = match;
		MealsApi.getFoods().then(foods => {
			this.setState({ foods } as IMealContainerState);
		});
		this.loadPlan(+params.id);
	}

	componentWillReceiveProps(nextProps: IMealContainerProps) {
		const { id } = this.state;
		const nextId = +nextProps.match.params.id;
		if (id !== nextId) {
			this.setState({
				id: null,
				name: '',
				targetCalories: 2000,
				targetProteinPercent: 40,
				targetCarbohydratesPercent: 30,
				targetFatPercent: 30,
				meals: [],
				submitting: false
			} as IMealContainerState);
			this.loadPlan(nextId);
		}
	}

	loadPlan = (planId: number) => {
		MealsApi.getPlan(planId).then(plan => {
			const { id, name, target, meals } = plan;
			const { protein, fat, carbohydrates } = target;
			const targetCalories = Math.round(protein * 4 + fat * 9 + carbohydrates * 4);
			const targetFatPercent = targetCalories === 0 ? 0 : Math.round(fat * 9 / targetCalories * 100);
			const targetCarbohydratesPercent = targetCalories === 0 ? 0 : Math.round(carbohydrates * 4 / targetCalories * 100);
			const targetProteinPercent = 100 - targetFatPercent - targetCarbohydratesPercent;
			this.setState({
				id,
				name,
				targetCalories,
				targetProteinPercent,
				targetFatPercent,
				targetCarbohydratesPercent,
				meals
			} as IMealContainerState);
		});
	}

	handleUpdateName = (name: string) => {
		this.setState({ name } as IMealContainerState);
	}

	handleUpdateTargetCalories = (targetCalories: number) => {
		this.setState({ targetCalories } as IMealContainerState);
	}

	handleUpdateTargetPercent = (proteinPercent: number, carbohydratesPercent: number, fatPercent: number) => {
		this.setState({
			targetProteinPercent: proteinPercent,
			targetCarbohydratesPercent: carbohydratesPercent,
			targetFatPercent: fatPercent
		} as IMealContainerState);
	}

	handleAddMeal = (id: number) => {
		const { foods, meals } = this.state;
		const newMeals = [...meals, { id, quantity: 1 }]
			.sort((a, b) => foods.findIndex(f => f.id === a.id) - foods.findIndex(f => f.id === b.id));
		this.setState({ meals: newMeals } as IMealContainerState);
	}

	handleUpdateQuantity = (index: number, quantity: number) => {
		const { meals } = this.state;
		const newMeals = [...meals];
		if (quantity <= 0) {
			newMeals.splice(index, 1);
		} else {
			newMeals[index].quantity = quantity;
		}
		this.setState({ meals: newMeals } as IMealContainerState);
	}

	handleClickSubmit = () => {
		const { history } = this.props;
		this.setState({ submitting: true } as IMealContainerState);
		const { id, name, targetCalories, targetProteinPercent, targetCarbohydratesPercent, targetFatPercent, meals } = this.state;
		const target = {
			protein: targetCalories * targetProteinPercent / 100 / 4,
			carbohydrates: targetCalories * targetCarbohydratesPercent / 100 / 4,
			fat: targetCalories * targetFatPercent / 100 / 9
		};
		MealsApi.updatePlan(id, name, target, meals).then(() => {
			history.push('/meals');
		});
	}

	handleClickCancel = () => {
		const { history } = this.props;
		history.push('/meals');
	}

	handleClickCopy = () => {
		const { history } = this.props;
		this.setState({ submitting: true } as IMealContainerState);
		const { name, targetCalories, targetProteinPercent, targetCarbohydratesPercent, targetFatPercent, meals } = this.state;
		const target = {
			protein: targetCalories * targetProteinPercent / 100 / 4,
			carbohydrates: targetCalories * targetCarbohydratesPercent / 100 / 4,
			fat: targetCalories * targetFatPercent / 100 / 9
		};
		MealsApi.updatePlan(0, `Copy of ${name}`, target, meals).then(id => {
			history.push(`/meals/${id}`);
		});
	}

	handleClickDelete = () => {
		const { history } = this.props;
		this.setState({ submitting: true } as IMealContainerState);
		const { id } = this.state;
		MealsApi.deletePlan(id).then(() => {
			history.push('/meals');
		});
	}

	render() {
		const {
			foods,
			id,
			name,
			targetCalories,
			targetProteinPercent,
			targetCarbohydratesPercent,
			targetFatPercent,
			meals,
			submitting
		} = this.state;
		return (foods === null || id === null) ?
			<Banner type='message' display='Loading meal plan...' /> : (
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
				onClickCopy={this.handleClickCopy}
				onClickDelete={this.handleClickDelete}
				/>
		);
	}
}

export default withRouter(MealContainer);
