import * as React from 'react';
import Button from '~/components/Button';
import Banner from '~/components/Banner';
import Card from '~/components/Card';
import * as styles from './RecordWeight.scss';

interface IRecordWeightProps {
	submitting: boolean;
	weightInPounds: string;
	onUpdateWeight(weightInPounds: string): void;
	onClickSubmit(): void;
	onClickDelete?(): void;
}

export default class RecordWeight extends React.PureComponent<IRecordWeightProps> {
	handleChange = (e: React.FormEvent<HTMLInputElement>) => {
		const { onUpdateWeight } = this.props;
		onUpdateWeight(e.currentTarget.value);
	}

	render() {
		const { submitting, weightInPounds, onClickSubmit, onClickDelete } = this.props;
		return (
			<Card className={styles.root}>
				<input
					className={styles.weight}
					type='text'
					placeholder='Weight in pounds (e.g. 210.1)'
					value={weightInPounds}
					autoFocus
					onChange={this.handleChange} />
				{submitting ?
					<Banner type='message' display='Submitting weight record...' /> :
					<Button className={styles.button} type='primary' display='Submit' onClick={onClickSubmit} />
				}
				{!submitting && onClickDelete &&
					<Button className={styles.button} type='danger' display='Delete' onClick={onClickDelete} />
				}
			</Card>
		);
	}
}
