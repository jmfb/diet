import * as React from 'react';
import { IndexLink, Link } from 'react-router';
import * as styles from './NavBar.scss';

export default class NavBar extends React.PureComponent<void, void> {
	render() {
		return(
			<header>
				<nav>
					<ul className={styles.header}>
						<li><IndexLink to='/' activeClassName={styles.active}>Home</IndexLink></li>
						<li><Link to='/weight' activeClassName={styles.active}>Weight</Link></li>
						<li><Link to='/meals' activeClassName={styles.active}>Meals</Link></li>
					</ul>
				</nav>
			</header>
		);
	}
};
