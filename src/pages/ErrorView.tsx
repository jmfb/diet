import * as React from 'react';
import Button from '~/components/Button';
import * as styles from './ErrorView.scss';

interface IErrorViewProps {
	status: number;
	statusText: string;
	error: any;
	onClickLogout: () => void;
}

export default class ErrorView extends React.PureComponent<IErrorViewProps, void> {
	render() {
		const { status, statusText, onClickLogout } = this.props;
		return (
			<main className={styles.root}>
				<h1>{status} - {statusText}</h1>
				<div className={styles.row}>
					<div className={styles.reason}>
						This error may be due to your session being out of date.<br />
						Try logging out and logging back in.
					</div>
					<Button type='primary' display='Logout' className={styles.action} onClick={onClickLogout} />
				</div>
				{this.renderError()}
			</main>
		);
	}

	renderError = () => {
		const { status } = this.props;
		switch (status) {
			case 500:
				return this.renderInternalServerError();
			case 401:
				return this.renderUnauthorized();
			default:
				return this.renderUnknownError();
		}
	}

	renderInternalServerError = () => {
		const { error } = this.props;
		const { Message, ExceptionMessage, ExceptionType, StackTrace } = error;
		return (
			<div className={styles.container}>
				<div className={styles.message}>{Message}</div>
				<div className={styles.exceptionType}>{ExceptionType}</div>
				<div className={styles.exceptionMessage}>{ExceptionMessage}</div>
				<div className={styles.stackTrace}>{StackTrace}</div>
			</div>
		);
	}

	renderUnauthorized = () => {
		const { error } = this.props;
		const { Message } = error;
		return (
			<div className={styles.container}>
				<div className={styles.message}>Unauthorized</div>
				<div className={styles.exceptionMessage}>{Message || error}</div>
			</div>
		);
	}

	renderUnknownError = () => {
		const { error } = this.props;
		return (
			<div className={styles.container}>
				<div className={styles.message}>Unknown Error</div>
				<div className={styles.exceptionMessage}>{JSON.stringify(error)}</div>
			</div>
		);
	}
}
