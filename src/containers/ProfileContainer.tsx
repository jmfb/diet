import * as React from 'react';
import { browserHistory } from 'react-router';
import Profile from '~/pages/Profile';
import Banner from '~/components/Banner';
import { IGender, IBodyType } from '~/models';
import { getProfile, updateProfile } from '~/api/profiles';

interface IProfileContainerState {
	genderId: IGender | null;
	bodyTypeId: IBodyType | null;
	heightInInches: number | null;
	birthYear: number | null;
	targetWeightInPounds: number | null;
	loading: boolean;
	submitting: boolean;
}

export default class ProfileContainer extends React.PureComponent<void, IProfileContainerState> {
	constructor(props: void) {
		super(props);
		this.state = {
			genderId: null,
			bodyTypeId: null,
			heightInInches: null,
			birthYear: null,
			targetWeightInPounds: null,
			loading: true,
			submitting: false
		};
	}

	componentDidMount() {
		getProfile().then(profile => {
			const { genderId, bodyTypeId, heightInInches, birthYear, targetWeightInPounds } = profile;
			this.setState({
				genderId,
				bodyTypeId,
				heightInInches,
				birthYear,
				targetWeightInPounds,
				loading: false
			} as IProfileContainerState);
		});
	}

	handleUpdateGender = (genderId: IGender) => {
		this.setState({ genderId } as IProfileContainerState);
	}

	handleUpdateBodyType = (bodyTypeId: IBodyType) => {
		this.setState({ bodyTypeId } as IProfileContainerState);
	}

	handleUpdateHeightInInches = (heightInInches: number) => {
		this.setState({ heightInInches } as IProfileContainerState);
	}

	handleUpdateBirthYear = (birthYear: number) => {
		this.setState({ birthYear } as IProfileContainerState);
	}

	handleUpdateTargetWeightInPounds = (targetWeightInPounds: number) => {
		this.setState({ targetWeightInPounds } as IProfileContainerState);
	}

	handleClickSubmit = () => {
		this.setState({ submitting: true } as IProfileContainerState);
		updateProfile(this.state).then(() => {
			browserHistory.push('/');
		});
	}

	render() {
		const { genderId, bodyTypeId, heightInInches, birthYear, targetWeightInPounds, loading, submitting } = this.state;
		if (loading) {
			return <Banner type='message' display='Loading profile...' />;
		}
		return (
			<Profile
				{...{genderId, bodyTypeId, heightInInches, birthYear, targetWeightInPounds, submitting}}
				onUpdateGender={this.handleUpdateGender}
				onUpdateBodyType={this.handleUpdateBodyType}
				onUpdateHeightInInches={this.handleUpdateHeightInInches}
				onUpdateBirthYear={this.handleUpdateBirthYear}
				onUpdateTargetWeightInPounds={this.handleUpdateTargetWeightInPounds}
				onClickSubmit={this.handleClickSubmit} />
		);
	}
}
