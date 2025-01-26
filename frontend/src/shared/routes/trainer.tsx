import {
	FeedbackPage,
	NotificationPage,
	ProfilePage,
	UsersSearchPage
} from 'pages/shared';
import {
	MainPage,
	CheckListPage,
	GroupListPage,
	CreateGroupPage,
	TrainerExercisePage
} from 'pages/trainer';
import { SchedulePage } from 'pages/shared';

import feedback from 'shared/assets/sidebar/feedback.svg';
import schedule from 'shared/assets/sidebar//schedule.svg';
import group from 'shared/assets/sidebar/group.svg';
import students from 'shared/assets/sidebar/students.svg';
import home from 'shared/assets/sidebar/home.svg';

const trainerRouter = [
	{
		path: '/',
		element: <MainPage title="Главная страница" />,
		img: home
	},
	{
		path: '/notifications',
		element: <NotificationPage title="Уведомления" />
	},
	{
		path: '/schedule',
		element: <SchedulePage title="Расписание" />,
		local: 'Расписание',
		img: schedule
	},
	{
		path: '/exercise/:id',
		element: <TrainerExercisePage title="Занятия" />,
		loader: ({ params: { id } }: any) => ({ id })
	},
	{
		path: '/schedule/:id',
		element: <CheckListPage title="Чек-лист" />,
		loader: ({ params: { id } }: any) => ({ id })
	},
	{
		path: '/groups',
		element: <GroupListPage title="Группы" />,
		local: 'Группы',
		img: group
	},
	{
		path: '/group/create',
		element: <CreateGroupPage title="Создать группу" />
	},
	{
		path: '/students',
		element: <UsersSearchPage title="Ученики" />,
		local: 'Ученики',
		img: students
	},
	{
		path: '/students/:id',
		element: <ProfilePage title="Ученик" blockEdit />,
		loader: ({ params: { id } }: any) => ({ id })
	},
	{
		path: '/feedback',
		element: <FeedbackPage title="Обратная связь" />,
		local: 'Обратная связь',
		img: feedback
	}
];

export default trainerRouter;
