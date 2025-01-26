import classNames from 'classnames';
import { ReactComponent as CloseIcon } from 'shared/assets/svg/close.svg';
import styles from './Tabs.module.scss';

interface TabsProps {
	activeTab: string;
	changeTab: (key: string) => void;
	onClose?: () => void;
}

export const Tabs = ({ activeTab, changeTab, onClose }: TabsProps) => {
	return (
		<header className={styles.header}>
			<div className={styles.btn_wrapper}>
				<button
					onClick={() => changeTab('create')}
					className={classNames(
						styles.tab,
						activeTab === 'create' ? styles.tab_active : ''
					)}
				>
					Создать
				</button>
				<button
					onClick={() => changeTab('view')}
					className={classNames(
						styles.tab,
						activeTab === 'view' ? styles.tab_active : ''
					)}
				>
					Посмотреть
				</button>
			</div>
			<CloseIcon
				onClick={onClose}
				className={styles.close_btn}
				width={'16px'}
			/>
		</header>
	);
};
