import { getCurrentDate, selectLessons } from 'app/providers/store';
import { Tabs } from 'pages/shared/Tabs/Tabs';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { AddLesson } from '../AddLesson/AddLesson';
import { ViewLesson } from '../ViewLesson/ViewLesson';
import { type LessonI } from 'entities/lesson/api/lessonApi.interface';
import styles from './ScheduleModal.module.scss';

interface ScheduleModalProps {
	day?: Date | string;
	setActive?: (active: boolean) => void;
	closeModal?: () => void;
	handleSubmit: () => void;
}

export const ScheduleModal = ({
	closeModal,
	day,
	handleSubmit
}: ScheduleModalProps) => {
	const lessons: Record<string, LessonI[]> = useSelector(selectLessons);
	const currentDate = useSelector(getCurrentDate);
	const [activeTab, setActiveTab] = useState('view');

	return (
		<div className={styles.component}>
			<Tabs
				onClose={closeModal}
				activeTab={activeTab}
				changeTab={(key: string) => setActiveTab(key)}
			/>
			{activeTab === 'view' ? (
				<ViewLesson lessons={lessons[currentDate as string] || []} />
			) : (
				<AddLesson day={day} data={lessons} onSubmit={handleSubmit} />
			)}
		</div>
	);
};
