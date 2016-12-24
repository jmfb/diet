import * as React from 'react';
import Button from '~/components/Button';
import Banner from '~/components/Banner';
import { IProfile } from '~/models';
import * as styles from './Home.scss';

interface IHomeProps {
	name: string;
	profile: IProfile | null;
	onClickLogout: () => void;
}

export default class Home extends React.PureComponent<IHomeProps, void> {
	render() {
		const { name, profile, onClickLogout } = this.props;
		return (
			<div>
				<h1>{name}</h1>
				{profile === null ?
					<Banner type='message' display='Loading profile...' /> :
					this.renderProfile()
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
