import classNames from 'classnames';
import { CardLink } from 'shared/ui';
import { ReactComponent as Arrow } from 'shared/assets/svg/arrow_45.svg';
import { curriculum } from 'shared/consts';
import { useResize } from 'shared/hooks';
import styles from './CurriculaCardLink.module.scss';

interface CurriculaCardLinkProps {
	className?: string;
}

export const CurriculaCardLink = ({ className }: CurriculaCardLinkProps) => {
	const isMobile = useResize('sm');

	return (
		<CardLink
			title="Учебные планы"
			className={classNames(styles.component, className)}
		>
			<div className={styles.container}>
				{curriculum.map((item) => (
					<div className={styles.month_wrapper} key={item.id}>
						<Arrow className={styles.icon} />
						<h3 className={styles.month}>
							{isMobile ? item.shortcut : item.title}
						</h3>
					</div>
				))}
			</div>
		</CardLink>
	);
};
