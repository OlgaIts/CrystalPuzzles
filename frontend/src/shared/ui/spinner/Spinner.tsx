import styles from './Spinner.module.scss';
import { Preloader } from './preloader/Preloader';

interface SpinnerProps {
	isLoading: boolean;
	children: React.ReactNode;
}
// TODO: erleichern
export default function Spinner({ children, isLoading }: SpinnerProps) {
	return (
		<>
			{isLoading ? (
				<div className={styles.container}>
					<Preloader />
				</div>
			) : (
				children
			)}
		</>
	);
}
