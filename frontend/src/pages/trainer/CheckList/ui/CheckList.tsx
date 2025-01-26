import styles from './CheckList.module.scss';
import { Page, Button } from 'shared/ui';
import ProfileCard from './ProfileCard/ProfileCard';
import Info from './Info/Info';
import { useState } from 'react';
import StudentsDropdown from 'entities/student/ui/studentsDropdown/StudentsDropdown';
import { useLoaderData } from 'react-router-dom';
import useCreateCheckList from '../hooks/useCreateCheckList';
import ExercisesMemo from 'widgets/exercises/Exercises';

interface CheckListPageProps {
	title: string;
}

export default function CheckListPage({ title }: CheckListPageProps) {
	const [students, setStudents] = useState<number[]>([]);
	const { id }: any = useLoaderData();

	const handleSubmit = useCreateCheckList({ id, students });

	return (
		<Page title={title}>
			<div className={styles.wrapper}>
				<ProfileCard className={styles.profile} />
				<Info className={styles.info} lessonId={id} />

				<section className={styles.panel_container}>
					<StudentsDropdown state={students} setState={setStudents} />
					<Button
						title="Отправить чек-лист"
						width="100%"
						form="exercises_form"
						bgColor="dark"
						className={styles.btn}
					/>
				</section>
				<section className={styles.exercises}>
					<form onSubmit={handleSubmit} id="exercises_form">
						<ExercisesMemo />
					</form>
				</section>
			</div>
		</Page>
	);
}
