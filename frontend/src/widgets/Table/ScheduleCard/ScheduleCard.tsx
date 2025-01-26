import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import moment from 'moment';
import {
	deleteLesson,
	getCurrentDate,
	getCurrentTrainer
} from 'app/providers/store';
import { Button, CustomTimePicker, Modal } from 'shared/ui';
import joinName from 'entities/profile/assets/joinName';
import { ReactComponent as ClockIcon } from 'shared/assets/svg/clock.svg';
import { ReactComponent as Trash } from 'shared/assets/svg/trash.svg';
import { ReactComponent as Pencil } from 'shared/assets/svg/pencil.svg';
import { ReactComponent as CircleCloseIcon } from 'shared/assets/svg/circle-close.svg';
import { ReactComponent as SaveIcon } from 'shared/assets/svg/circle-save.svg';
import { getLessons } from 'app/providers/store/service/getLessons';
import PlacesDropdown from 'entities/place/ui/PlacesDropdown/PlacesDropdown';
import { Lesson } from 'entities/lesson';
import { type LessonI } from 'entities/lesson/api/lessonApi.interface';
import 'react-time-picker/dist/TimePicker.css';
import styles from './ScheduleCard.module.scss';

interface ScheduleCardProps {
	className?: string;
	item: LessonI;
}

export const ScheduleCard = ({ item, className }: ScheduleCardProps) => {
	const dispatch = useDispatch();
	const currentTrainer = useSelector(getCurrentTrainer);
	const currentDate = useSelector(getCurrentDate);
	const trainer_id = currentTrainer?.id;
	const [confirmDeleteActive, setConfirmDeleteActive] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [errModalActive, setErrModalActive] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [editLesson, setEditLesson] = useState({
		id: item?.id,
		space_id: item?.space?.id || undefined,
		trainer_id: item?.trainer?.id || undefined,
		trainer_comments: item?.trainer_comments || '',
		start:
			item?.start || moment(currentDate).set({ hour: 12, minute: 0 }).format()
	});

	const handleUpdate = async () => {
		const [, err] = await Lesson.update({ ...editLesson });
		if (err) {
			setError('Не удалось обновить урок. Попробуйте ещё раз');
			return;
		}
		setIsEditing(false);
		getLessons(trainer_id!, moment(currentDate));
	};

	const handleDelete = async (id: number) => {
		const [, e] = await Lesson.delete(id);
		if (e) {
			setError(e);
			setErrModalActive(true);
		} else {
			dispatch(deleteLesson(id));
		}
	};

	return (
		<li className={classNames(styles.component, className)}>
			<div className={styles.trainer_wrapper}>
				<p>Тренер:</p>
				<p className={styles.trainer}>{joinName(item.trainer)}</p>
			</div>

			<div className={styles.place_wrapper}>
				<ClockIcon width={'26px'} />

				<div className={styles.wrapper}>
					{isEditing ? (
						<CustomTimePicker
							className={styles.time}
							value={moment(editLesson.start).format('HH:mm')}
							onChange={(time: string | null) => {
								if (time) {
									const [hour, minute] = time
										.split(':')
										.map((unit) => parseInt(unit, 10));
									setEditLesson((prev) => ({
										...prev,
										start: moment(currentDate).set({ hour, minute }).format()
									}));
								}
							}}
						/>
					) : (
						<p>{moment(item.start).format('HH:mm')}</p>
					)}

					{isEditing ? (
						<PlacesDropdown
							editing
							state={editLesson.space_id}
							setState={(id: string) =>
								setEditLesson({ ...editLesson, space_id: Number(id) })
							}
							className={styles.place}
							single
						/>
					) : (
						<p className={styles.place}>{item.space.name} </p>
					)}
				</div>
			</div>

			<div className={styles.comment_wrapper}>
				<div className={styles.subtitle}>Комментарии:</div>
				{isEditing ? (
					<textarea
						rows={3}
						className={styles.textarea}
						value={editLesson.trainer_comments || ''}
						onChange={(e) =>
							setEditLesson((prev) => ({
								...prev,
								trainer_comments: e.target.value
							}))
						}
					/>
				) : (
					<div className={styles.text_wrapper}>
						<p className={styles.text}>{item.trainer_comments}</p>
					</div>
				)}
			</div>
			<div className={styles.icon_wrapper}>
				{isEditing ? (
					<>
						<SaveIcon
							onClick={handleUpdate}
							className={styles.icon}
							width={28}
							height={28}
						/>
						<CircleCloseIcon
							onClick={() => setIsEditing(false)}
							className={styles.icon}
							width={28}
							height={28}
						/>
					</>
				) : (
					<>
						<Pencil
							className={styles.icon}
							onClick={() => setIsEditing(true)}
						/>
						<Trash
							className={styles.icon}
							onClick={() => setConfirmDeleteActive(true)}
						/>
					</>
				)}
			</div>

			{confirmDeleteActive && (
				<div className={styles.confirm}>
					<div>
						<p className={styles.question}>
							Вы действительно хотите удалить запись?
						</p>
						<div className={styles.btn_wrapper}>
							<Button
								className={styles.btn}
								title="Удалить"
								width="180px"
								bgColor="dark"
								onClick={() => handleDelete(item.id)}
							/>
							<Button
								title="Отменить"
								width="180px"
								onClick={() => setConfirmDeleteActive(false)}
							/>
						</div>
					</div>
				</div>
			)}
			{error && (
				<Modal active={errModalActive} setActive={setErrModalActive}>
					<div className={styles.error_content}>
						<p>Ошибка при удалении.</p>
						<p>Запись не была удалена. Попробуйте позже.</p>
					</div>
				</Modal>
			)}
		</li>
	);
};
