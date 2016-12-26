import * as React from 'react';

interface IMealContainerProps {
	params: { id: string; };
}

export default class MealContainer extends React.PureComponent<IMealContainerProps, void> {
	render() {
		const { params } = this.props;
		return (
			<div>
				<h1>Meal plan #{params.id}</h1>
				TODO
			</div>
		);
	}
}
