import snowflake from 'shared/assets/svg/snowflake2.svg';
import Checkbox from 'shared/ui/checkbox/Checkbox';
import styles from './ExerciseItem.module.scss';
import { useResize } from 'shared/hooks';

interface ExerciseItemProps {
	index: number;
	text: string;
	id: number;
	checked?: boolean;
	disabled?: boolean;
}

export default function ExerciseItem({
	index,
	text,
	id,
	checked,
	disabled
}: ExerciseItemProps) {
	const isMobile = useResize('md');

	return (
		<li className={styles.component}>
			<div className={styles.number}>{index}</div>
			{!isMobile ? (
				<div className={styles.icon_wrapper}>
					<img className={styles.icon} src={snowflake} />
				</div>
			) : null}
			<span className={styles.text}>{text}</span>
			<Checkbox
				id={id}
				checked={checked}
				disabled={disabled}
				className={styles.checkbox}
			/>
		</li>
	);
}
