import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import moment, { Moment } from 'moment';
import 'moment/locale/ru';
import Header from './Header/Header';
import DaysList from './DaysList/DaysList';
import DaysOfWeek from './DaysOfWeek/DaysOfWeek';
import { Modal } from 'shared/ui';
import { getCurrentTrainer } from 'app/providers/store';
import { getLessons } from 'app/providers/store/service/getLessons';
import styles from './Table.module.scss';
import { ScheduleModal } from 'widgets/Table/scheduleModal/ui/ScheduleModal/ScheduleModal';

interface TableProps {
	className?: string;
}

const Table = ({ className }: TableProps) => {
	const currentTrainer = useSelector(getCurrentTrainer);
	const trainer_id = currentTrainer?.id;
	const [date, setDate] = useState<Moment>(moment().startOf('week'));
	const [modalActive, setModalActive] = useState<any | boolean>(false);

	const handleSubmit = () => {
		getLessons(trainer_id!, date);
	};

	useEffect(() => {
		getLessons(trainer_id!, date);
	}, [trainer_id, date, modalActive]);

	return (
		<div className={classNames(styles.datepicker, className)}>
			<Header setStartDate={setDate} startDate={date} />
			<div className={styles.grid_wrap}>
				<DaysOfWeek />
				<DaysList setModalActive={setModalActive} />
			</div>

			{modalActive && (
				<Modal active={modalActive} setActive={setModalActive}>
					<ScheduleModal
						day={modalActive}
						setActive={setModalActive}
						closeModal={() => setModalActive(false)}
						handleSubmit={handleSubmit}
					/>
				</Modal>
			)}
		</div>
	);
};

export default Table;
