export { default as store } from './store';
export {
	appSliceReducer,
	setHeader,
	setPlaces,
	setStudents,
	setTrainers,
	selectHeader,
	selectPlaces,
	selectStudents,
	selectTrainers
} from './app';

export {
	scheduleSliceReducer,
	createLessons,
	setLessons,
	deleteLesson,
	selectLessons
} from './schedule';

export { profileSliceReducer, setProfile, selectProfile } from './profile';

export {
	scheduleModalSliceReducer,
	setCurrentTrainer,
	setCurrentDate,
	getCurrentDate,
	getCurrentTrainer
} from './scheduleModal';
