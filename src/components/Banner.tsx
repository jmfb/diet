import * as React from 'react';
import * as styles from './Banner.scss';
import * as cx from 'classnames';

type BannerType = 'error' | 'message';

interface IBannerProps {
	type: BannerType;
	display: string;
}

export default class Banner extends React.PureComponent<IBannerProps, void> {
	render() {
		const { type, display } = this.props;
		return(
			<div className={cx(styles.root, styles[type])}>{display}</div>
		);
	}
}
