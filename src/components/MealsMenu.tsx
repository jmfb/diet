import * as React from 'react';
import { NavLink } from 'react-router-dom';
import * as styles from './MealsMenu.scss';

export default class MealsMenu extends React.PureComponent {
	render() {
		return (
			<ul className={styles.root}>
				<li><NavLink exact to='/meals' activeClassName={styles.active}>Meals</NavLink></li>
				<li><NavLink to='/meals/foods' activeClassName={styles.active}>Foods</NavLink></li>
			</ul>
		);
	}
}
