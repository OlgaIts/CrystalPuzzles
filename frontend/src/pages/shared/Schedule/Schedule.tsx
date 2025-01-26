import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Page, Wrapper } from 'shared/ui';
import { CalendarBlock } from 'features';
import { Lesson } from 'entities/lesson';
import { selectProfile } from 'app/providers/store';
import styles from './Schedule.module.scss';
import Schedule from 'widgets/schedule/Schedule';

interface SchedulePageProps {
	title: string;
	link?: string | null;
}

export default function SchedulePage({ link, title }: SchedulePageProps) {
	const { id } = useSelector(selectProfile);
	const [data, setData] = useState<any>([]);
	const [date, setDate] = useState({
		from: moment().startOf('day'),
		to: moment().endOf('day')
	});

	useEffect(() => {
		getLessons();
	}, [date]);

	async function getLessons() {
		const [data, err] = await Lesson.get({
			start_date: date.from.toISOString(),
			end_date: date.to.toISOString(),
			trainer: id
		});
		if (err) return;
		setData(data);
	}
	return (
		<Page title={title}>
			<div className={styles.wrapper}>
				<Schedule />
				<Wrapper>
					<CalendarBlock date={date} setDate={setDate} />
				</Wrapper>
			</div>
		</Page>
	);
}
