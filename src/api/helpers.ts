import { browserHistory } from '~/Application';

export async function checkStatus(response: Response) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	} else {
		const error = await response.text();
		console.error(`${response.status} - ${response.statusText}\n${error}`);
		if (browserHistory) {
			browserHistory.push({
				pathname: '/error',
				state: {
					status: response.status,
					statusText: response.statusText,
					error
				}
			});
		}
	}
}

export async function parseJson(response: Response) {
	return await response.json();
}

export function authHeader() {
	const token = localStorage.getItem('token');
	return `Token ${token}`;
}
