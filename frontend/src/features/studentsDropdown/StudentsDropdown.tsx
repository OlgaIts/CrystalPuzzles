import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectStudents, setStudents } from 'app/providers/store/app';
import { DropDownButton } from 'features';
import { User } from 'entities/user';
import joinName from 'entities/profile/assets/joinName';

interface StudentsDropdownProps {
	className?: string;
	state: any;
	setState: any;
	single?: boolean;
}

export default function StudentsDropdown({
	state,
	setState,
	className,
	single
}: StudentsDropdownProps) {
	const students: any = useSelector(selectStudents)?.map((item: any) => ({
		...item,
		name: joinName(item)
	}));
	const dispatch = useDispatch();

	useEffect(() => {
		getStudents();
	}, [students]);

	async function getStudents() {
		if (!students) {
			const [data, err] = await User.getStudents();
			if (err) return;
			dispatch(setStudents(data));
		}
	}

	return (
		<DropDownButton
			className={className}
			title="Выберите учеников"
			state={state}
			setState={setState}
			data={students}
			single={single}
		/>
	);
}
