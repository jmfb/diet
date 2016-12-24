import * as React from 'react';
import * as styles from './SignInButton.scss';
import * as cx from 'classnames';

interface ISignInButtonProps {
	disabled: boolean;
	style: 'dark' | 'light';
	className?: string;
	onClick: () => void;
}

export default class SignInButton extends React.PureComponent<ISignInButtonProps, void> {
	render() {
		const { disabled, style, className, onClick } = this.props;
		return (
			<div
				className={cx(
					styles.root,
					styles[style],
					{ [styles.disabled]: disabled },
					className)}
				onClick={onClick}>
			</div>
		);
	}
}
