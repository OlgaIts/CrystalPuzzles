import { createSlice } from '@reduxjs/toolkit';
import { type TrainerI } from './scheduleModal';
import { RootState } from './store';
// import Place from 'shared/api/place';

interface AppState {
	header: string;
	places: any[] | null;
	students: any[] | null;
	trainers: TrainerI[] | null;
	isLoading: boolean;
}

const initialState: AppState = {
	header: 'Главная страница',
	places: null,
	students: null,
	trainers: null,
	isLoading: false
};

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setHeader(state, action) {
			state.header = action.payload;
		},
		setPlaces(state, action) {
			state.places = action.payload;
		},
		setStudents(state, action) {
			state.students = action.payload;
		},
		setTrainers(state, action) {
			state.trainers = action.payload;
		},
		setIsLoading(state, action) {
			state.isLoading = action.payload;
		}
	}
});

export const selectHeader = (state: RootState) => state.app.header;
export const selectPlaces = (state: RootState) => state.app.places;
export const selectStudents = (state: RootState) => state.app.students;
export const selectTrainers = (state: RootState) => state.app.trainers;
export const selectIsLoading = (state: RootState) => state.app.isLoading;

export const { setHeader, setPlaces, setStudents, setTrainers, setIsLoading } =
	appSlice.actions;

export const appSliceReducer = appSlice.reducer;
