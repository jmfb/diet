import * as React from 'react';
import { IndexLink, Link } from 'react-router';
import * as styles from './MealsMenu.scss';

export default class MealsMenu extends React.PureComponent<void, void> {
	render() {
		return (
			<ul className={styles.root}>
				<li><IndexLink to='/meals' activeClassName={styles.active}>Meals</IndexLink></li>
				<li><Link to={`/meals/foods`} activeClassName={styles.active}>Foods</Link></li>
			</ul>
		);
	}
}
