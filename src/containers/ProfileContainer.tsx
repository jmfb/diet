import * as React from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import Profile from '~/pages/Profile';
import Banner from '~/components/Banner';
import { IGender, IBodyType } from '~/models';
import ProfilesApi from '~/api/ProfilesApi';

interface IProfileContainerState {
	genderId: IGender | null;
	bodyTypeId: IBodyType | null;
	heightInInches: number | null;
	birthYear: number | null;
	targetWeightInPounds: number | null;
	loading: boolean;
	submitting: boolean;
}

class ProfileContainer extends React.PureComponent<RouteComponentProps, IProfileContainerState> {
	constructor(props: RouteComponentProps) {
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
		ProfilesApi.getProfile().then(profile => {
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
		const { history } = this.props;
		this.setState({ submitting: true } as IProfileContainerState);
		ProfilesApi.updateProfile(this.state).then(() => {
			history.push('/');
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

export default withRouter(ProfileContainer);
