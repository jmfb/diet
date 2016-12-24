import * as React from 'react';

export default class ApplicationContainer extends React.PureComponent<void, void> {
	render() {
		return (
			<div>
				<main>
					{this.props.children}
				</main>
			</div>
		);
	}
}
