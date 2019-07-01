import * as React from 'react';
import { Link } from 'react-router-dom';
import Card from '~/components/Card';
import Button from '~/components/Button';
import Banner from '~/components/Banner';
import { IWeightRecord } from '~/models';
import * as styles from './Weight.scss';

interface IWeightProps {
	weights: IWeightRecord[];
	moreWeights: boolean;
	loading: boolean;
	onClickAdd: () => void;
	onClickImport: () => void;
	onClickLoadMore: () => void;
}

export default class Weight extends React.PureComponent<IWeightProps> {
	render() {
		const { weights, moreWeights, loading, onClickAdd, onClickImport, onClickLoadMore } = this.props;
		return (
			<div className={styles.root}>
				<Button className={styles.option} type='primary' display='Record Weight' onClick={onClickAdd} />
				<Button className={styles.option} type='secondary' display='Import Weight Records' onClick={onClickImport} />
				{weights.map((weight, i) => (
					<Card key={i} className={styles.record}>
						<div className={styles.date}><Link to={`/weight/${weight.when}`}>{weight.when}</Link></div>
						<div className={styles.weight}>{weight.weightInPounds} lbs.</div>
					</Card>
				))}
				{!loading && moreWeights &&
					<Button type='primary' display='Load More' onClick={onClickLoadMore} />
				}
				{loading &&
					<Banner type='message' display='Loading more weight records...' />
				}
			</div>
		);
	}
}
