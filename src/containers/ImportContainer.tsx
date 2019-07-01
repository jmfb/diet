import * as React from 'react';
import ImportWeightRecords from '~/pages/ImportWeightRecords';
import { IWeightRecord } from '~/models';
import { updateWeight } from '~/api/weight';
import * as moment from 'moment';

interface IImportContainerState {
	weightRecords: IWeightRecord[];
	submitting: boolean;
	pendingFileCount: number;
}

export default class ImportContainer extends React.PureComponent<{}, IImportContainerState> {
	fileReader: FileReader;
	pendingFiles: File[];

	constructor(props: {}) {
		super(props);
		this.state = {
			weightRecords: [],
			submitting: false,
			pendingFileCount: 0
		};
		this.fileReader = new FileReader();
		this.pendingFiles = [];
	}

	componentDidMount() {
		this.fileReader.onload = () => {
			const { result } = this.fileReader as { result: string };
			this.loadWeightRecords(this.parseWeightRecords(result));
			this.pendingFiles.splice(0, 1);
			this.setState({
				pendingFileCount: this.pendingFiles.length
			} as IImportContainerState);
			if (this.pendingFiles.length > 0) {
				this.fileReader.readAsText(this.pendingFiles[0]);
			}
		};
	}

	componentWillUnmount() {
		this.fileReader.onload = null;
	}

	handleChooseFile = (file: File) => {
		this.pendingFiles.push(file);
		this.setState({
			pendingFileCount: this.pendingFiles.length
		} as IImportContainerState);
		if (this.fileReader.readyState !== this.fileReader.LOADING) {
			this.fileReader.readAsText(this.pendingFiles[0]);
		}
	}

	handleClickSubmit = () => {
		const { weightRecords } = this.state;
		if (weightRecords.length === 0) {
			return;
		}
		this.setState({ submitting: true } as IImportContainerState);
		setTimeout(this.uploadNextWeightRecord, 0);
	}

	uploadNextWeightRecord = () => {
		const { weightRecords } = this.state;
		const { when, weightInPounds } = weightRecords[0];
		updateWeight(when, weightInPounds).then(() => {
			weightRecords.splice(0, 1);
			this.setState({
				weightRecords: [...weightRecords],
				submitting: weightRecords.length > 0
			} as IImportContainerState);
			if (weightRecords.length > 0) {
				setTimeout(this.uploadNextWeightRecord, 0);
			}
		});
	}

	parseWeightRecord = (node: Element) => {
		const when = moment(node.getElementsByTagName('date')[0].textContent).format('YYYY-MM-DD');
		const weightInPounds = Math.round(+node.getElementsByTagName('real')[1].textContent * 2.20462 * 10) / 10;
		return { when, weightInPounds };
	}

	parseWeightRecords = (contents: string) => {
		const nodes = new DOMParser().parseFromString(contents, 'text/xml')
			.getElementsByTagName('plist')[0]
			.getElementsByTagName('dict')[0]
			.getElementsByTagName('array')[0]
			.getElementsByTagName('dict');
		const weightRecords = [] as IWeightRecord[];
		for (let index = 0; index < nodes.length; ++index) {
			weightRecords.push(this.parseWeightRecord(nodes[index]));
		}
		return weightRecords;
	}

	loadWeightRecords = (newWeightRecords: IWeightRecord[]) => {
		const { weightRecords } = this.state;
		this.setState({
			weightRecords: [...weightRecords, ...newWeightRecords]
		} as IImportContainerState);
	}

	render() {
		const { weightRecords, submitting, pendingFileCount } = this.state;
		return (
			<ImportWeightRecords
				{...{weightRecords, submitting, pendingFileCount}}
				onChooseFile={this.handleChooseFile}
				onClickSubmit={this.handleClickSubmit} />
		);
	}
}
