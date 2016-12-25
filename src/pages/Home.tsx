import * as React from 'react';
import Button from '~/components/Button';
import Banner from '~/components/Banner';
import WeightGraph from '~/components/WeightGraph';
import { IProfile, IWeightRecord } from '~/models';
import * as styles from './Home.scss';

interface IHomeProps {
	name: string;
	profile: IProfile | null;
	lifetime: IWeightRecord[] | null;
	last30days: IWeightRecord[] | null;
	last7days: IWeightRecord[] | null;
	onClickLogout: () => void;
}

export default class Home extends React.PureComponent<IHomeProps, void> {
	render() {
		const { name, profile, lifetime, last30days, last7days, onClickLogout } = this.props;
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
				<Button className={styles.option} type='primary' display='Logout' onClick={onClickLogout} />
			</div>
		);
	}

	renderProfile = () => {
		const { profile } = this.props;
		const { genderId, bodyTypeId, heightInInches, birthYear, targetWeightInPounds } = profile;
		return (
			<div>
				<div>Gender: {genderId}</div>
				<div>Body Type: {bodyTypeId}</div>
				<div>Height (in): {heightInInches}</div>
				<div>Birth Year: {birthYear}</div>
				<div>Target Weight (lbs): {targetWeightInPounds}</div>
			</div>
		);
	}
}
