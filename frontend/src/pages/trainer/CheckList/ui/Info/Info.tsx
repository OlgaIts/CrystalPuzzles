import { useState, useEffect } from 'react';
import moment from 'moment';
import classNames from 'classnames';
import { Lesson } from 'entities/lesson';
import { type LessonI } from 'entities/lesson/api/lessonApi.interface';
import styles from './Info.module.scss';

interface InfoProps {
	lessonId: string;
	className?: string;
}

export default function Info({ lessonId, className }: InfoProps) {
	const [data, setData] = useState<LessonI | undefined>(undefined);

	useEffect(() => {
		getLesson();
	}, []);

	async function getLesson() {
		const [data, err] = await Lesson.getById(lessonId);
		if (err) return;
		setData(data);
	}
	return (
		<section className={classNames(styles.container, className)}>
			<p className={styles.wrapper}>
				Дата:
				<span className={styles.data}>
					{data && moment(data.start).format('DD.MM.YYYY')}
				</span>
			</p>

			<p className={styles.wrapper}>
				Время:
				<span className={styles.data}>
					{data && moment(data.start).format('HH:mm')}
				</span>
			</p>

			<p className={styles.wrapper}>
				Площадка:
				<span className={styles.data}>{data && data.space.name}</span>
			</p>

			<p className={styles.wrapper}>
				Комментарий:
				<span className={styles.data}>{data && data.trainer_comments}</span>
			</p>
		</section>
	);
}
