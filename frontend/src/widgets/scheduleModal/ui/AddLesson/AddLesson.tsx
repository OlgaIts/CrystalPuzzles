import { useState } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { Lesson } from 'entities/lesson';
import { Button, CustomTimePicker } from 'shared/ui';
import TrainersDropdown from 'features/trainersDropdown/TrainersDropdown';
import PlacesDropdown from 'features/placesDropdown/PlacesDropdown/PlacesDropdown';
import { getCurrentTrainer } from 'app/providers/store';
import { type LessonI } from 'entities/lesson/api/lessonApi.interface';
import 'react-time-picker/dist/TimePicker.css';
import styles from './AddLesson.module.scss';

interface AddLessonProps {
	day: any;
	data: { [key: string]: LessonI[] };
	onSubmit: () => void;
}

export const AddLesson = ({ onSubmit, day }: AddLessonProps) => {
	const currentTrainer = useSelector(getCurrentTrainer);
	const [newLesson, setNewLesson] = useState<any>({
		space_id: null,
		trainer_id: currentTrainer?.id,
		trainer_comments: null,
		start: moment(day).set({ hour: 12, minute: 0 }).format()
	});
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	async function handleSubmit() {
		const { space_id, trainer_id, start } = newLesson;
		if (!space_id || !trainer_id || !start) {
			setErrorMessage(
				'Пожалуйста, заполните все обязательные поля: тренер, площадка и время.'
			);
			return;
		}
		const [, err] = await Lesson.create(newLesson);
		if (err) {
			setErrorMessage(
				'Произошла ошибка при создании урока. Попробуйте ещё раз.'
			);
			return;
		}
		onSubmit();
		setErrorMessage(null);
	}

	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<TrainersDropdown
					state={newLesson.trainer_id}
					setState={(id: string) =>
						setNewLesson({ ...newLesson, trainer_id: id })
					}
					className={styles.trainer}
					single
				/>
				<PlacesDropdown
					state={newLesson.space_id}
					setState={(id: string) =>
						setNewLesson((prev: any) => ({ ...prev, space_id: id }))
					}
					className={styles.place}
					single
				/>

				{/* //TODO: написать свой TimePicker */}
				<CustomTimePicker
					className={styles.time}
					value={moment(newLesson.start).format('HH:mm')}
					onInput={(e: any) => {
						if (e.target.value.length >= 2) {
							e.target.value = e.target.value.slice(0, 2);
						}
					}}
					onChange={(e: any) => {
						if (!e) return;
						const [hour, minute] = e.split(':').map(Number);
						setNewLesson((prev: any) => ({
							...prev,
							start: moment(day).set({ hour, minute }).format()
						}));
					}}
				/>

				<textarea
					className={styles.textarea}
					onChange={(e) =>
						setNewLesson((prev: any) => ({
							...prev,
							trainer_comments: e.target.value
						}))
					}
				></textarea>
				{errorMessage && <div className={styles.error}>{errorMessage}</div>}
				<Button className={styles.submit} onClick={handleSubmit} bgColor="dark">
					Отправить
				</Button>
			</main>
		</div>
	);
};
