import { browserHistory } from '~/Application';

export default class BaseApi {
	static async checkStatus(response: Response) {
		const { status, statusText } = response;
		if (status < 200 || status >= 300) {
			const error = await response.text();
			const errorMessage = `${status} - ${statusText}\n${error}`;
			if (browserHistory !== null) {
				console.error(errorMessage);
				browserHistory.push({
					pathname: '/error',
					state: {
						status,
						statusText,
						error
					}
				});
			} else {
				throw new Error(errorMessage);
			}
		}
	}

	static authHeader() {
		const token = localStorage.getItem('token');
		return `Token ${token}`;
	}
}
