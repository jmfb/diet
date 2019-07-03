import BaseApi from './BaseApi';
import { ILoginModel } from '~/models';
import * as queryString from 'query-string';

const redirectUrl = `${location.origin}/authenticate`;

export default class AuthApi extends BaseApi {
	static async getAuthenticationUrl() {
		const query = queryString.stringify({ redirectUrl });
		const response = await fetch(`/api/Authentication/GetAuthenticationUrl?${query}`, {
			headers: {
				Accept: 'application/json'
			}
		});
		await super.checkStatus(response);
		return await response.json() as string;
	}

	static async login(authorizationCode: string) {
		const query = queryString.stringify({
			redirectUrl,
			authorizationCode
		});
		const response = await fetch(`/api/Authentication/Login?${query}`, {
			headers: {
				Accept: 'application/json'
			}
		});
		await super.checkStatus(response);
		return await response.json() as ILoginModel;
	}
}
