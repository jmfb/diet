import * as React from 'react';
import * as styles from './Card.scss';
import * as cx from 'classnames';

interface ICardProps {
	className?: string;
}

export default class Card extends React.PureComponent<ICardProps, void> {
	render() {
		const { className } = this.props;
		return (
			<div className={cx(styles.root, className)}>
				{this.props.children}
			</div>
		);
	}
}
