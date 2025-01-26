import { ScheduleCard } from 'widgets/Table/ScheduleCard/ScheduleCard';
import { LessonI } from 'entities/lesson/api/lessonApi.interface';
import styles from './ViewLesson.module.scss';

interface ViewLessonProps {
	lessons: LessonI[];
}

export const ViewLesson = ({ lessons }: ViewLessonProps) => {
	return (
		<ul className={styles.cards_content}>
			{lessons.map((item) => (
				<ScheduleCard key={item.id} item={item} />
			))}
		</ul>
	);
};
