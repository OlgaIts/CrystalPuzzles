import { SchedulePage } from 'pages/shared';
import {
	MainPage,
	ExercisePage,
	TrainPage,
	SurveyPage,
	RewardPage
} from 'pages/student';
import schedule from 'shared/assets/sidebar/schedule.svg';
import home from 'shared/assets/sidebar/home.svg';
import survey from 'shared/assets/sidebar/survey.svg';
import reward from 'shared/assets/sidebar/reward.svg';
import exercise from 'shared/assets/sidebar/exercise.svg';

const studentRouter = [
	{
		path: '/',
		element: <MainPage title="Главная страница" />,
		img: home
	},
	{
		path: '/train',
		element: <TrainPage title="Мои тренировки" />,
		local: 'Тренировки',
		img: exercise
	},
	{
		path: '/train/:id',
		element: <ExercisePage title="Мои занятия" />,
		loader: ({ params: { id } }: any) => ({ id })
	},
	{
		path: '/schedule',
		element: <SchedulePage link="/train/" title="Расписание" />,
		local: 'Расписание',
		img: schedule,
		loader: ({ params: { id } }: any) => ({ id })
	},
	{
		path: '/survey',
		element: <SurveyPage title="Анкета" />,
		local: 'Анкета',
		img: survey
	},
	{
		path: '/reward',
		element: <RewardPage title="Коллекция наград" />,
		local: 'Коллекция наград',
		img: reward
	}
];

export default studentRouter;
