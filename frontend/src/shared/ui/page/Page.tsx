import { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { selectIsLoading, setHeader } from 'app/providers/store/app';
import styles from './Page.module.scss';
import { useSelector } from 'react-redux';
import Spinner from '../spinner/Spinner';

interface PageProps {
	title: string;
	children: ReactNode;
	className?: string;
}
// Merge with checkInPage wrapper
export default function Page({ title, children, className }: PageProps) {
	const dispatch = useDispatch();
	const isLoading = useSelector(selectIsLoading);

	useEffect(() => {
		dispatch(setHeader(title));
	}, [title]);

	return (
		<Spinner isLoading={isLoading}>
			<main className={classNames(styles.body, className)}>{children}</main>
		</Spinner>
	);
}
