import { createSlice } from "@reduxjs/toolkit";

export const typedWordsSlice = createSlice({
	name: "typedWords",
	initialState: {
		typedWordsValue: "",
	},
	reducers: {
		setTypedWords: (state, action) => {
			state.typedWordsValue = action.payload;
		},
	},
});

export const wordsSlice = createSlice({
	name: "words",
	initialState: {
		wordsValue: "",
	},
	reducers: {
		setWords: (state, action) => {
			state.wordsValue = action.payload;
		},
	},
});

export const { setWords } = wordsSlice.actions;
export const { setTypedWords } = typedWordsSlice.actions;

export const wordsReducer = wordsSlice.reducer;
export const typedWordsReducer = typedWordsSlice.reducer;
