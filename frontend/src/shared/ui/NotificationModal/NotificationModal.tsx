import classNames from 'classnames';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import Title from '../title/Title';
import envelopeIcon from 'shared/assets/svg/envelope.svg';
import envelopeSecondIcon from 'shared/assets/svg/envelope-2.svg';
import line from 'shared/assets/svg/wavy_line.svg';
import styles from './NotificationModal.module.scss';

// TODO: Refactor this component to use the new text prop and interface
export const NotificationModal = ({ onHide, text }: any) => {
	useEffect(() => {
		setTimeout(() => {
			onHide();
		}, 3000);
	}, [onHide]);

	return createPortal(
		<div className={styles.component}>
			<div className={styles.wrapper}>
				<img
					src={line}
					className={classNames(styles.line_one, styles.object)}
				/>
				<img
					src={envelopeIcon}
					className={classNames(styles.envelope_one, styles.object)}
				/>
				<img
					src={envelopeSecondIcon}
					className={classNames(styles.envelope_two, styles.object)}
				/>
				<img
					src={envelopeIcon}
					className={classNames(styles.envelope_three, styles.object)}
				/>
				<img
					src={line}
					className={classNames(styles.line_two, styles.object)}
				/>
				<img
					src={line}
					className={classNames(styles.line_three, styles.object)}
				/>
			</div>
			<Title tag="h2" className={styles.title}>
				{text}
			</Title>
		</div>,
		document.getElementById('portal') as HTMLElement
	);
};
