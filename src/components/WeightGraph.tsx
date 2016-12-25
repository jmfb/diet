import * as React from 'react';
import Card from './Card';
import { IWeightRecord } from '~/models';
import * as styles from './WeightGraph.scss';
import * as d3 from 'd3';
import { min, max } from 'lodash';

interface IWeightGraphProps {
	targetWeightInPounds: number | null;
	title: string;
	weightRecords: IWeightRecord[];
}

export default class WeightGraph extends React.PureComponent<IWeightGraphProps, void> {
	private rootNode: SVGElement;

	componentWillUpdate() {
		while (this.rootNode.firstChild) {
			this.rootNode.removeChild(this.rootNode.firstChild);
		}
	}

	drawChart = () => {
		const { targetWeightInPounds, weightRecords } = this.props;
		const margin = 0;
		const width = this.rootNode.clientWidth - 2 * margin;
		const height = this.rootNode.clientHeight - 2 * margin;
		const y = d3.scaleLinear().range([height, 0]);
		const x = d3.scaleLinear().range([0, width]);
		const area = d3.area()
			.x((d, i) => { d = d; return x(i); })
			.y0(height)
			.y1((d: any) => y(d.weightInPounds));
		const line = d3.line()
			.x((d, i) => { d = d; return x(i); })
			.y((d: any) => y(d.weightInPounds));

		const svg = d3.select(this.rootNode)
			.append('g')
			.attr('transform', `translate(${margin},${margin})`);

		const minWeight = d3.min(weightRecords, d => d.weightInPounds);
		const maxWeight = d3.max(weightRecords, d => d.weightInPounds);
		const lowerBound = targetWeightInPounds === null ?
			minWeight :
			Math.min(minWeight, Math.max(0, targetWeightInPounds - 10));
		const upperBound = targetWeightInPounds === null ?
			maxWeight :
			Math.max(maxWeight, targetWeightInPounds + 10);

		y.domain([lowerBound, upperBound]);
		x.domain([0, weightRecords.length - 1]);

		if (targetWeightInPounds !== null) {
			const yTarget = y(targetWeightInPounds);
			svg.append('line')
				.attr('x1', x(0))
				.attr('x2', x(weightRecords.length - 1))
				.attr('y1', yTarget)
				.attr('y2', yTarget)
				.attr('class', styles.target);
		}

		svg.append('path')
			.datum(weightRecords)
			.attr('class', `${styles.area}`)
			.attr('d', area as any);

		svg.append('path')
			.datum(weightRecords)
			.attr('class', `${styles.line}`)
			.attr('d', line as any);
	}

	render() {
		const { title, weightRecords } = this.props;
		if (weightRecords.length > 1) {
			if (this.rootNode) {
				this.drawChart();
			} else {
				setTimeout(() => this.drawChart(), 0);
			}
		}
		return (
			<Card className={styles.root}>
				<div className={styles.header}>
					<div className={styles.title}>{title}</div>
					{weightRecords.length > 0 && this.renderSummary()}
				</div>
				{weightRecords.length === 0 &&
					<div className={styles.none}>No weight records</div>
				}
				{weightRecords.length > 1 &&
					<svg ref={node => this.rootNode = node} className={styles.svg}></svg>
				}
			</Card>
		);
	}

	renderSummary = () => {
		const { weightRecords } = this.props;
		const weights = weightRecords.map(weightRecord => weightRecord.weightInPounds);
		const minWeight = min(weights);
		const maxWeight = max(weights);
		const firstWeight = weights[0];
		const lastWeight = weights[weights.length - 1];
		const overallChange = Math.round((lastWeight - firstWeight) * 10) / 10;
		return (
			<div className={styles.summary}>
				{firstWeight} -> {lastWeight} ({overallChange}, min: {minWeight}, max: {maxWeight})
			</div>
		);
	}
}
