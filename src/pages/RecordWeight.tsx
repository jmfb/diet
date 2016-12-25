import * as React from 'react';
import Button from '~/components/Button';
import Banner from '~/components/Banner';
import Card from '~/components/Card';
import * as styles from './RecordWeight.scss';

interface IRecordWeightProps {
	submitting: boolean;
	weightInPounds: string;
	onUpdateWeight: (weightInPounds: string) => void;
	onClickSubmit: () => void;
}

export default class RecordWeight extends React.PureComponent<IRecordWeightProps, void> {
	handleChange = (e: React.FormEvent<HTMLInputElement>) => {
		const { onUpdateWeight } = this.props;
		onUpdateWeight(e.currentTarget.value);
	}

	render() {
		const { submitting, weightInPounds, onClickSubmit } = this.props;
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
					<Button type='primary' display='Submit' onClick={onClickSubmit} />
				}
			</Card>
		);
	}
}
