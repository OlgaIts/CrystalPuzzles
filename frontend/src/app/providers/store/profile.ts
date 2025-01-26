import { createSlice } from '@reduxjs/toolkit';
import { Profile } from 'entities/profile';
import { RootState } from './store';

const profileSlice = createSlice({
	name: 'profile',
	initialState: {
		profile: new Profile()
	},
	reducers: {
		setProfile: (state, action) => {
			state.profile = action.payload;
		}
	}
});

export const selectProfile = (state: RootState) => state.profile.profile;

export const { setProfile } = profileSlice.actions;
export const profileSliceReducer = profileSlice.reducer;
