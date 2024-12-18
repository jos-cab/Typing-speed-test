import { createSlice } from '@reduxjs/toolkit';

export const wpmSlice = createSlice({
	name: 'wpm',
	initialState: {
		wpmValue: 0,
	},
	reducers: {
		setWPM: (state, action) => {
			state.wpmValue = action.payload;
		},
	},
});

export const accuracySlice = createSlice({
	name: 'accuracy',
	initialState: {
		accuracyValue: 100,
	},
	reducers: {
		setAccuracy: (state, action) => {
			state.accuracyValue = action.payload;
		},
	},
});

export const { setWPM } = wpmSlice.actions;
export const { setAccuracy } = accuracySlice.actions;

export const wpmReducer = wpmSlice.reducer;
export const accuracyReducer = accuracySlice.reducer;
