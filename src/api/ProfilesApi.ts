import BaseApi from './BaseApi';
import { IProfile } from '~/models';

export default class ProfilesApi extends BaseApi {
	static async getProfile() {
		const response = await fetch('/api/Profiles/GetProfile', {
			credentials: 'same-origin',
			headers: {
				Accept: 'application/json',
				Authorization: super.authHeader()
			}
		});
		await super.checkStatus(response);
		return await response.json() as IProfile;
	}

	static async updateProfile(profile: IProfile) {
		const response = await fetch('/api/Profiles/UpdateProfile', {
			credentials: 'same-origin',
			method: 'POST',
			headers: {
				Accept: 'application/json',
				Authorization: super.authHeader(),
				['Content-Type']: 'application/json'
			},
			body: JSON.stringify(profile)
		});
		await super.checkStatus(response);
	}
}
