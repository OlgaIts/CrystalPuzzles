import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTrainers, setTrainers } from 'app/providers/store/app';
import { DropDownButton } from 'features';
import { User } from 'entities/user';
import joinName from 'entities/profile/assets/joinName';
import {
	getCurrentTrainer,
	setCurrentTrainer
} from 'app/providers/store/scheduleModal';

interface TrainersDropdownProps {
	className?: string;
	state?: any;
	setState?: any;
	single?: boolean;
}

export default function TrainersDropdown({
	className,
	single
}: TrainersDropdownProps) {
	const dispatch = useDispatch();
	const trainers = useSelector(selectTrainers);
	const currentTrainer = useSelector(getCurrentTrainer);

	useEffect(() => {
		if (!currentTrainer) {
			getTrainers();
		}
	}, []);

	async function getTrainers() {
		const [data, err] = await User.getTrainers();
		if (err) return;
		const trainers = data.map((item: any) => ({
			...item,
			name: joinName(item)
		}));
		dispatch(setCurrentTrainer(trainers[0]));
		dispatch(setTrainers(trainers));
	}

	const changeCurrentTrainer = (id: number) => {
		if (trainers) {
			const newCurrentTrainer = trainers.find(
				({ id: trainerId }) => id === trainerId
			);
			newCurrentTrainer && dispatch(setCurrentTrainer(newCurrentTrainer));
		}
	};

	if (!trainers || !currentTrainer?.id) {
		return null;
	}

	return (
		<DropDownButton
			className={className}
			title="Выберите тренера"
			state={currentTrainer.id}
			setState={changeCurrentTrainer}
			data={trainers as any}
			single={single}
		/>
	);
}
