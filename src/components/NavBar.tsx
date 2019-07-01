import * as React from 'react';
import { NavLink } from 'react-router-dom';
import * as styles from './NavBar.scss';

export default class NavBar extends React.PureComponent {
	render() {
		return(
			<header>
				<nav>
					<ul className={styles.header}>
						<li><NavLink exact to='/' activeClassName={styles.active}>Home</NavLink></li>
						<li><NavLink to='/weight' activeClassName={styles.active}>Weight</NavLink></li>
						<li><NavLink to='/meals' activeClassName={styles.active}>Meals</NavLink></li>
					</ul>
				</nav>
			</header>
		);
	}
}
