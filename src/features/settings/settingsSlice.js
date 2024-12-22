import { createSlice } from '@reduxjs/toolkit';

export const settingsOpenedSlice = createSlice({
	name: 'settings',
	initialState: {
		settingsOpenedValue: false,
	},
	reducers: {
		setSettingsOpened: (state, action) => {
			state.settingsOpenedValue = action.payload;
		},
	},
});

export const testTypeSlice = createSlice({
	name: 'test-type',
	initialState: {
		testTypeValue: 'words',
		wordCountValue: 50,
	},
	reducers: {
		setWordCount: (state, action) => {
			state.wordCountValue = action.payload;
		},
	},
});

export const { setSettingsOpened } = settingsOpenedSlice.actions;
export const { setWordCount } = testTypeSlice.actions;

export const settingsOpenedReducer = settingsOpenedSlice.reducer;
export const testTypeReducer = testTypeSlice.reducer;
