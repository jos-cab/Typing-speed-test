import { createSlice } from '@reduxjs/toolkit';

export const typedCharactersSlice = createSlice({
	name: 'typedCharacters',
	initialState: {
		typedCharactersValue: '',
	},
	reducers: {
		setTypedCharacters: (state, action) => {
			state.typedCharactersValue = action.payload;
		},
	},
});

export const wordsSlice = createSlice({
	name: 'words',
	initialState: {
		wordsValue: [],
	},
	reducers: {
		setWords: (state, action) => {
			state.wordsValue = action.payload;
		},
	},
});

export const { setWords } = wordsSlice.actions;
export const { setTypedCharacters } = typedCharactersSlice.actions;

export const wordsReducer = wordsSlice.reducer;
export const typedCharactersReducer = typedCharactersSlice.reducer;
