import * as React from 'react';
import FileInput from '~/components/FileInput';
import Button from '~/components/Button';
import Banner from '~/components/Banner';
import { IWeightRecord } from '~/models';
import * as styles from './ImportWeightRecords.scss';

interface IImportWeightRecordsProps {
	submitting: boolean;
	pendingFileCount: number;
	weightRecords: IWeightRecord[];
	onChooseFile: (file: File) => void;
	onClickSubmit: () => void;
}

export default class ImportWeightRecords extends React.PureComponent<IImportWeightRecordsProps> {
	handleChooseFile = (e: React.FormEvent<HTMLInputElement>) => {
		const { files } = e.currentTarget;
		const { onChooseFile } = this.props;
		for (let index = 0; index < files.length; ++index) {
			onChooseFile(files[index]);
		}
	}

	render() {
		const { submitting, pendingFileCount, weightRecords, onClickSubmit } = this.props;
		return (
			<div>
				<h1>Import Weight Records</h1>
				<FileInput
					accept='*.xml'
					onChange={this.handleChooseFile}>
					<Button element='div' type='primary' display='Select file' />
				</FileInput>
				<div className={styles.progress}>
					{weightRecords.length > 0 && pendingFileCount === 0 && !submitting &&
						<Button type='primary' display='Submit' onClick={onClickSubmit} />
					}
					{submitting &&
						<Banner type='message' display={`Uploading ${weightRecords.length} weight records...`} />
					}
					{pendingFileCount > 0 &&
						<Banner type='message' display={`Parsing ${pendingFileCount} files...`} />
					}
					{weightRecords.length === 0 && pendingFileCount === 0 && !submitting &&
						<Banner type='message' display='Select a .xml file to upload.' />
					}
				</div>
				{weightRecords.map((weightRecord, i) => (
					<div key={i} className={styles.record}>
						<div className={styles.when}>{weightRecord.when}</div>
						&ndash;
						<div className={styles.weight}>{weightRecord.weightInPounds} lbs.</div>
					</div>
				))}
			</div>
		);
	}
}
