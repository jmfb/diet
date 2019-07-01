import * as React from 'react';
import * as styles from './FileInput.scss';

interface IFileInputProps extends React.HTMLProps<HTMLInputElement> {
	children?: React.ReactNode;
}

export default class FileInput extends React.PureComponent<IFileInputProps> {
	render() {
		const { children } = this.props;
		let inputProps = { ...this.props };
		delete inputProps.children;
		return(
			<label className={styles.root}>
				<input
					type='file'
					{...inputProps} />
				{children}
			</label>
		);
	}
}
