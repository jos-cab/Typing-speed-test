import { createSlice } from "@reduxjs/toolkit";

export const testTimeSlice = createSlice({
	name: "testTime",
	initialState: {
		testTimeValue: 0,
	},
	reducers: {
		setTestTime: (state, action) => {
			state.testTimeValue = action.payload;
		},
	},
});

export const timerSlice = createSlice({
	name: "timer",
	initialState: {
		currentTimeValue: 0,
	},
	reducers: {
		decrementCurrentTime: (state) => {
			state.currentTimeValue--;
		},
		setCurrentTime: (state, action) => {
			state.currentTimeValue = action.payload;
		},
		setIsRunning: (state, action) => {
			state.isRunningValue = action.payload;
		},
	},
});

export const { setTestTime } = testTimeSlice.actions;
export const { decrementCurrentTime, setCurrentTime, setIsRunning } =
	timerSlice.actions;

export const testTimeReducer = testTimeSlice.reducer;
export const timerReducer = timerSlice.reducer;
