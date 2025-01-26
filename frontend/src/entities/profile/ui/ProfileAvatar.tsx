import { selectProfile } from 'app/providers/store';
import { useSelector } from 'react-redux';
import avatar from 'shared/assets/avatar/0.png';
import classNames from 'classnames';

export default function ProfileAvatar({ className, ...props }: any) {
	const profile = useSelector(selectProfile);

	return (
		<img
			src={profile.photo ? profile.photo : avatar}
			className={classNames(className)}
			alt=""
			{...props}
		/>
	);
}
