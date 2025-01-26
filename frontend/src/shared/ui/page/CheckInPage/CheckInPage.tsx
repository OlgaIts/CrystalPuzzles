import styles from './CheckInPage.module.scss';
import { Header } from 'widgets';
// Rename
export default function CheckInPage({ children }: any) {
	return (
		<div className={styles.container}>
			<Header check_in />
			<div className={styles.content}>{children}</div>
		</div>
	);
}
