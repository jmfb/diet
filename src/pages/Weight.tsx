import * as React from 'react';
import Button from '~/components/Button';
import * as styles from './Weight.scss';

interface IWeightProps {
	onClickAdd: () => void;
	onClickImport: () => void;
}

export default class Weight extends React.PureComponent<IWeightProps, void> {
	render() {
		const { onClickAdd, onClickImport } = this.props;
		return (
			<div className={styles.root}>
				<Button className={styles.option} type='primary' display='Record Weight' onClick={onClickAdd} />
				<Button className={styles.option} type='secondary' display='Import Weight Records' onClick={onClickImport} />
			</div>
		);
	}
}
