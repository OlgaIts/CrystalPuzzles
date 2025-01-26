import { v4 as uuid } from 'uuid';
import { ReactComponent as CheckedIcon } from 'shared/assets/svg/checked.svg';
import styles from './Checkbox.module.scss';
import classNames from 'classnames';

interface CheckboxProps {
	id: number;
	checked?: boolean;
	disabled?: boolean;
	className?: string;
}

export default function Checkbox({
	id,
	checked,
	disabled,
	className
}: CheckboxProps) {
	const inputId = uuid();
	return (
		<label className={classNames(styles.label, className)} htmlFor={inputId}>
			<input
				type="checkbox"
				id={inputId}
				value={id}
				className={styles.checkbox}
				checked={checked}
				disabled={disabled}
				readOnly
			/>
			<CheckedIcon className={styles.icon} />
		</label>
	);
}
