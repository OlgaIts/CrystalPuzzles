import { useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { selectProfile } from 'app/providers/store';
import styles from './ProfileCard.module.scss';

interface ProfileProps {
	className?: string;
}

export default function ProfileCard({ className }: ProfileProps) {
	const user = useSelector(selectProfile);
	const [userPhoto] = useState(
		user.photo
			? user.photo
			: require(`shared/assets/avatar/${user.avatar || 0}.png`)
	);

	return (
		<section className={classNames(styles.profile_container, className)}>
			<img src={userPhoto} alt="" className={styles.avatar} />
			<div className={styles.name_container}>
				<div className={styles.name}>
					{user.surname} {user.firstname}
				</div>
			</div>
		</section>
	);
}
