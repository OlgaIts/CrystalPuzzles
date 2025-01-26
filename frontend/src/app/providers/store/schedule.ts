import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { RootState } from './store';
import { type LessonI } from 'entities/lesson/api/lessonApi.interface';

interface LessonsState {
	lessons: { [key: string]: LessonI[] };
}

const initialState: LessonsState = {
	lessons: {}
};

const scheduleSlice = createSlice({
	name: 'schedule',
	initialState,
	reducers: {
		createLessons(state, action: PayloadAction<LessonI>) {
			const key = moment(action.payload.start).format('YYYY-MM-DD');
			if (!state.lessons[key]) {
				state.lessons[key] = [];
			}
			state.lessons = {
				...state.lessons,
				[key]: state.lessons[key]
					? [...state.lessons[key], action.payload]
					: [action.payload]
			};
		},
		setLessons(state, action: PayloadAction<{ [key: string]: LessonI[] }>) {
			state.lessons = action.payload;
		},
		deleteLesson(state, action: PayloadAction<number>) {
			Object.keys(state.lessons).forEach((key) => {
				if (state.lessons[key]) {
					state.lessons[key] = state.lessons[key].filter(
						(lesson: LessonI) => lesson.id !== action.payload
					);
				}
			});
		}
	}
});

export const selectLessons = (state: RootState) => state.schedule.lessons;

export const { createLessons, setLessons, deleteLesson } =
	scheduleSlice.actions;
export const scheduleSliceReducer = scheduleSlice.reducer;
