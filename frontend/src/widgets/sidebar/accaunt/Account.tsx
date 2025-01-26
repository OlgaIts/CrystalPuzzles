import styles from './Account.module.scss';
import { roleAdapter } from 'entities/profile';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileAvatar from 'entities/profile/ui/ProfileAvatar';

export const Account = ({ user, className, isMobile }: any) => {
	const position = useMemo(() => roleAdapter(user.role), [user]);
	const navigate = useNavigate();

	return (
		<div className={`${styles.accaunt_wrap} ${className}`}>
			<ProfileAvatar
				className={styles.avatar}
				onClick={() => navigate('/profile', { state: { user } })}
			/>
			{!isMobile && (
				<div>
					<p className={styles.profession}>{position}</p>
					<p className={styles.name}>{user.firstname}</p>
				</div>
			)}
		</div>
	);
};
