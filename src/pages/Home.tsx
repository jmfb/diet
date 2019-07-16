import * as React from 'react';
import Button from '~/components/Button';
import Banner from '~/components/Banner';
import Card from '~/components/Card';
import WeightGraph from '~/components/WeightGraph';
import { IProfile, IWeightRecord } from '~/models';
import * as styles from './Home.scss';
import * as cx from 'classnames';

interface IHomeProps {
	name: string;
	profile: IProfile | null;
	lifetime: IWeightRecord[] | null;
	last30days: IWeightRecord[] | null;
	last7days: IWeightRecord[] | null;
	onClickProfile(): void;
	onClickLogout(): void;
	onClickRecordWeight(): void;
}

export default class Home extends React.PureComponent<IHomeProps> {
	render() {
		const { name, profile, lifetime, last30days, last7days, onClickProfile, onClickLogout, onClickRecordWeight } = this.props;
		const targetWeightInPounds = profile === null ? null : profile.targetWeightInPounds;
		return (
			<div>
				<h1>{name}</h1>
				{profile === null ?
					<Banner type='message' display='Loading profile...' /> :
					this.renderProfile()
				}
				{last7days === null ?
					<Banner type='message' display='Loading weight records for last 7 days...' /> :
					<WeightGraph
						{...{targetWeightInPounds}}
						title='Last 7 days'
						weightRecords={last7days} />
				}
				{last30days === null ?
					<Banner type='message' display='Loading weight records for last 30 days...' /> :
					<WeightGraph
						{...{targetWeightInPounds}}
						title='Last 30 days'
						weightRecords={last30days} />
				}
				{lifetime === null ?
					<Banner type='message' display='Loading lifetime weight records...' /> :
					<WeightGraph
						{...{targetWeightInPounds}}
						title='Lifetime'
						weightRecords={lifetime} />
				}
				<Button className={styles.option} type='primary' display='Record Weight' onClick={onClickRecordWeight} />
				<Button className={styles.option} type='secondary' display='Profile' onClick={onClickProfile} />
				<Button className={styles.option} type='secondary' display='Logout' onClick={onClickLogout} />
			</div>
		);
	}

	renderProfile = () => {
		const { profile } = this.props;
		const { targetWeightInPounds } = profile;
		const { lifetime } = this.props;
		const currentWeight = lifetime === null || lifetime.length === 0 ?
			null :
			lifetime[lifetime.length - 1].weightInPounds;
		const difference = targetWeightInPounds === null || currentWeight === null ?
			null :
			Math.round((targetWeightInPounds - currentWeight) * 10) / 10;
		return (
			<div className={styles.summary}>
				<Card className={styles.tile}>
					<div className={styles.label}>Target:</div>
					{targetWeightInPounds !== null &&
						<div className={styles.value}>{targetWeightInPounds} <span className={styles.units}>lbs.</span></div>
					}
				</Card>
				<Card className={styles.tile}>
					<div className={styles.label}>Current:</div>
					{currentWeight !== null &&
						<div className={styles.value}>{currentWeight} <span className={styles.units}>lbs.</span></div>
					}
				</Card>
				<Card className={styles.tile}>
					<div className={styles.label}>Goal:</div>
					{difference !== null &&
						<div className={cx(styles.goal, { [styles.negative]: difference < 0 })}>
							{difference >= 0 ? '+' : ''}{difference} <span className={styles.units}>lbs.</span>
						</div>
					}
				</Card>
			</div>
		);
	}
}
