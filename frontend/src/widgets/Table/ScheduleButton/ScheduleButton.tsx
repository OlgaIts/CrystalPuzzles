import { ReactComponent as File } from './assets/check_list.svg';
import styles from './ScheduleButton.module.scss';

interface ScheduleButtonProps {
	className?: string;
	onclick?: () => void;
}

export const ScheduleButton = ({ onclick, className }: ScheduleButtonProps) => {
	return (
		<div className={className}>
			<File onClick={onclick} className={styles.file} />
		</div>
	);
};
