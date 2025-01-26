import styles from './Schedule.module.scss';
import { useState } from 'react';
import ScheduleItem from './ScheduleItem/ScheduleItem';

export default function Schedule() {
	const [data, setData] = useState();

	return (
		<div className={styles.table}>
			{data.length
				? data
						.sort((a: any, b: any) => moment(a.start).isSameOrAfter(b.start))
						.map((item: any, index: number) => (
							<ScheduleItem
								data={item}
								key={index}
								link={
									link ? link + item.id : ScheduleRouteTo(item.status) + item.id
								}
								className={index === 0 ? styles.last : ''}
							/>
						))
				: null}
		</div>
	);
}
