import * as React from 'react';
import { browserHistory } from 'react-router';
import Banner from '~/components/Banner';
import EditMeal from '~/pages/EditMeal';
import { IFood, IMeal } from '~/models';
import { getFoods, getPlan, updatePlan, deletePlan } from '~/api/meals';

interface IMealContainerProps {
	params: { id: string; };
}

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

export default class MealContainer extends React.PureComponent<IMealContainerProps, IMealContainerState> {
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
		const { params } = this.props;
		getFoods().then(foods => {
			this.setState({ foods } as IMealContainerState);
		});
		this.loadPlan(+params.id);
	}

	componentWillReceiveProps(nextProps: IMealContainerProps) {
		const { id } = this.state;
		const nextId = +nextProps.params.id;
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
		getPlan(planId).then(plan => {
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
		this.setState({ submitting: true } as IMealContainerState);
		const { id, name, targetCalories, targetProteinPercent, targetCarbohydratesPercent, targetFatPercent, meals } = this.state;
		const target = {
			protein: targetCalories * targetProteinPercent / 100 / 4,
			carbohydrates: targetCalories * targetCarbohydratesPercent / 100 / 4,
			fat: targetCalories * targetFatPercent / 100 / 9
		};
		updatePlan(id, name, target, meals).then(() => {
			browserHistory.push('/meals');
		});
	}

	handleClickCancel = () => {
		browserHistory.push('/meals');
	}

	handleClickCopy = () => {
		this.setState({ submitting: true } as IMealContainerState);
		const { name, targetCalories, targetProteinPercent, targetCarbohydratesPercent, targetFatPercent, meals } = this.state;
		const target = {
			protein: targetCalories * targetProteinPercent / 100 / 4,
			carbohydrates: targetCalories * targetCarbohydratesPercent / 100 / 4,
			fat: targetCalories * targetFatPercent / 100 / 9
		};
		updatePlan(0, `Copy of ${name}`, target, meals).then(id => {
			browserHistory.push(`/meals/${id}`);
		});
	}

	handleClickDelete = () => {
		this.setState({ submitting: true } as IMealContainerState);
		const { id } = this.state;
		deletePlan(id).then(() => {
			browserHistory.push('/meals');
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
