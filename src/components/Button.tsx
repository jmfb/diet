import * as React from 'react';
import * as styles from './Button.scss';
import * as cx from 'classnames';

type ButtonType = 'primary' | 'secondary' | 'danger';

interface IButtonProps {
	className?: string;
	display: string;
	element?: 'button' | 'div';
	type: ButtonType;
	onClick?: () => void;
}

export default class Button extends React.PureComponent<IButtonProps, void> {
	render() {
		const { className, display, element, type, onClick } = this.props;
		const buttonProps = {
			className: cx(styles.button, styles[type], className),
			onClick
		};
		return element === 'div' ?
			<div {...buttonProps}>{display}</div> :
			<button {...buttonProps}>{display}</button>;
	}
}
