import classNames from 'classnames';
import ExerciseItem from './ExerciseItem/ExerciseItem';
import styles from './Exercises.module.scss';
import { memo, useEffect, useState } from 'react';
import { Exercise } from 'entities/exercise';
import { v4 as uuid } from 'uuid';

interface ExercisesProps {
	data?: any;
	className?: string;
	disabled?: boolean;
	checked?: boolean;
}

function Exercises({ data, className, disabled, checked }: ExercisesProps) {
	const [exercises, setExercises] = useState(data);

	useEffect(() => {
		if (data) return;
		getExercises();
	}, []);

	async function getExercises() {
		const [data, err] = await Exercise.get();
		if (err) return;
		setExercises(data);
	}

	return (
		<ul className={classNames(styles.list, className)}>
			{exercises?.map((item: any, index: number) => (
				<ExerciseItem
					key={uuid()}
					id={item.id}
					index={index + 1}
					text={item.name}
					checked={checked && item.isComplete}
					disabled={disabled}
				/>
			))}
		</ul>
	);
}

const ExercisesMemo = memo(Exercises);
export default ExercisesMemo;
