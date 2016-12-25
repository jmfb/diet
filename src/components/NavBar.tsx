import * as React from 'react';
import { IndexLink } from 'react-router';
import * as styles from './NavBar.scss';

export default class NavBar extends React.PureComponent<void, void> {
	render() {
		return(
			<header>
				<nav>
					<ul className={styles.header}>
						<li><IndexLink to='/' activeClassName={styles.active}>Home</IndexLink></li>
					</ul>
				</nav>
			</header>
		);
	}
};
