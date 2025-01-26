import { Outlet } from 'react-router-dom';
import { Page } from 'shared/ui';
import Table from './Table/Table';
import TrainersDropdown from 'features/trainersDropdown/TrainersDropdown';
import styles from './Schedule.module.scss';

interface SchedulePageProps {
	title: string;
}

export default function SchedulePage({ title }: SchedulePageProps) {
	return (
		<Page title={title}>
			<div className={styles.component}>
				<Table className={styles.table} />
				<TrainersDropdown className={styles.trainer} single />
			</div>
			<Outlet />
		</Page>
	);
}
