import * as React from 'react';
import Card from '~/components/Card';
import Button from '~/components/Button';
import Banner from '~/components/Banner';
import { IGender, IBodyType, genders, bodyTypes } from '~/models';
import * as styles from './Profile.scss';

interface IProfileProps {
	submitting: boolean;
	genderId: IGender | null;
	bodyTypeId: IBodyType | null;
	heightInInches: number | null;
	birthYear: number | null;
	targetWeightInPounds: number | null;
	onUpdateGender: (genderId: IGender) => void;
	onUpdateBodyType: (bodyTypeId: IBodyType) => void;
	onUpdateHeightInInches: (heightInInches: number) => void;
	onUpdateBirthYear: (birthYear: number) => void;
	onUpdateTargetWeightInPounds: (targetWeightInPounds: number) => void;
	onClickSubmit: () => void;
}

export default class Profile extends React.PureComponent<IProfileProps, void> {
	handleChangeGender = (genderId: number) => {
		return () => {
			const { onUpdateGender } = this.props;
			onUpdateGender(genderId as IGender);
		};
	}

	handleChangeBodyType = (bodyTypeId: number) => {
		return () => {
			const { onUpdateBodyType } = this.props;
			onUpdateBodyType(bodyTypeId as IBodyType);
		};
	}

	handleChangeHeightInInches = (e: React.FormEvent<HTMLInputElement>) => {
		const { onUpdateHeightInInches } = this.props;
		onUpdateHeightInInches(+e.currentTarget.value);
	}

	handleChangeBirthYear = (e: React.FormEvent<HTMLInputElement>) => {
		const { onUpdateBirthYear } = this.props;
		onUpdateBirthYear(+e.currentTarget.value);
	}

	handleChangeTargetWeightInPounds = (e: React.FormEvent<HTMLInputElement>) => {
		const { onUpdateTargetWeightInPounds } = this.props;
		onUpdateTargetWeightInPounds(+e.currentTarget.value);
	}

	render() {
		const { submitting, genderId, bodyTypeId, heightInInches, birthYear, targetWeightInPounds, onClickSubmit } = this.props;
		return (
			<Card className={styles.root}>
				<h1>Edit Profile</h1>
				<div className={styles.form}>
					<div className={styles.row}>
						<div className={styles.label}>Gender:</div>
						{genders.map((gender, i) => (
							<label key={i}>
								<input
									type='radio'
									name='gender'
									value={gender}
									checked={genderId === i}
									onChange={this.handleChangeGender(i)} />
								{gender}
							</label>
						))}
					</div>
					<div className={styles.row}>
						<div className={styles.label}>Body Type:</div>
						{bodyTypes.map((bodyType, i) => (
							<label key={i}>
								<input
									type='radio'
									name='bodyType'
									value={bodyType}
									checked={bodyTypeId === i}
									onChange={this.handleChangeBodyType(i)} />
								{bodyType}
							</label>
						))}
					</div>
					<div className={styles.row}>
						<div className={styles.label}>Height (in):</div>
						<input
							type='number'
							placeholder='e.g. 60'
							value={heightInInches}
							onChange={this.handleChangeHeightInInches} />
					</div>
					<div className={styles.row}>
						<div className={styles.label}>Birth Year:</div>
						<input
							type='number'
							placeholder='e.g. 1979'
							value={birthYear}
							onChange={this.handleChangeBirthYear} />
					</div>
					<div className={styles.row}>
						<div className={styles.label}>Target Weight (lbs):</div>
						<input
							type='number'
							placeholder='e.g. 210'
							value={targetWeightInPounds}
							onChange={this.handleChangeTargetWeightInPounds} />
					</div>
				</div>
				{submitting ?
					<Banner type='message' display='Updating profile...' /> :
					<Button type='primary' display='Submit' onClick={onClickSubmit} />
				}
			</Card>
		);
	}
}
