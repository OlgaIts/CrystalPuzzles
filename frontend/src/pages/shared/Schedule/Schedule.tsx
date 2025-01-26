import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Page, Wrapper } from 'shared/ui';
import { CalendarBlock } from 'features';
import ScheduleItem from './ScheduleItem/ScheduleItem';
import { Lesson } from 'entities/lesson';
import ScheduleRouteTo from 'shared/lib/scheduleRouteTo';
import { selectProfile } from 'app/providers/store';
import styles from './Schedule.module.scss';
import classNames from 'classnames';

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
				<div className={classNames(data.length === 0 ? '' : styles.table)}>
					{data.length
						? data
								.sort((a: any, b: any) =>
									moment(a.start).isSameOrAfter(b.start)
								)
								.map((item: any, index: number) => (
									<ScheduleItem
										data={item}
										key={index}
										link={
											link
												? link + item.id
												: ScheduleRouteTo(item.status) + item.id
										}
										className={index === 0 ? styles.last : ''}
									/>
								))
						: null}
				</div>
				<Wrapper>
					<CalendarBlock date={date} setDate={setDate} />
				</Wrapper>
			</div>
		</Page>
	);
}
