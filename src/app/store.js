import { configureStore } from '@reduxjs/toolkit';
import { timerReducer, testTimeReducer } from '../features/timer/timerSlice';
import {
	wordsReducer,
	typedCharactersReducer,
} from '../features/words/wordsSlice';

export default configureStore({
	reducer: {
		timer: timerReducer,
		testTime: testTimeReducer,
		words: wordsReducer,
		typedCharacters: typedCharactersReducer,
	},
});
