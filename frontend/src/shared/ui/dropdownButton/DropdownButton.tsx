import { useState } from 'react';
import classNames from 'classnames';
import { ReactComponent as SmallArrow } from 'shared/assets/svg/small_arrow.svg';
import Checkbox from '../checkbox/Checkbox';
import styles from './DropdownButton.module.scss';
import { v4 as uuid } from 'uuid';

type DataType = {
	id: string | number;
	name: string;
	[key: string]: any;
};

interface DropdownButtonProps {
	className?: string;
	title: string;
	data: DataType[];
	state: any;
	setState: (value: any) => void;
	single?: boolean;
	editing?: boolean;
}

export default function DropdownButton({
	title,
	className,
	data,
	state,
	setState,
	single = false,
	editing = false
}: DropdownButtonProps) {
	const [open, setOpen] = useState(false);

	const handleCheckboxChange = (itemId: string) => {
		if (single) {
			setState(itemId);
		} else if (state.includes(itemId)) {
			const updatedSelectedIds = state.filter((id: any) => id !== itemId);
			setState(updatedSelectedIds);
		} else {
			const updatedSelectedIds = [...state, itemId];
			setState(updatedSelectedIds);
		}
	};

	return (
		<div
			className={classNames(
				styles.dropdown,
				className,
				editing ? styles.dropdown_edit : ''
			)}
			onClick={() => setOpen((prev) => !prev)}
		>
			<button
				className={classNames(
					styles.dropdown_button,
					editing ? styles.btn_edit : ''
				)}
			>
				<span>{title}</span>
				<SmallArrow
					className={classNames(
						styles.small_arrow,
						open ? styles.arrow_open : ''
					)}
					height={'16px'}
					width={'20px'}
				/>
			</button>

			<form
				className={classNames(
					styles.dropdown_list,
					open ? styles.active : '',
					editing ? styles.edit_list : ''
				)}
				onClick={(e) => e.stopPropagation()}
			>
				{data?.length
					? data.map((item: any) => (
							<div
								key={uuid()}
								className={styles.list_item}
								onClick={() => handleCheckboxChange(item.id)}
							>
								<span>{item.name}</span>
								<Checkbox
									id={item.id}
									checked={
										single ? state === item.id : state?.includes(item.id)
									}
								/>
							</div>
						))
					: null}
			</form>
		</div>
	);
}
