import { useSelector, useDispatch } from 'react-redux';
import { setWPM, setAccuracy } from './features/stats/statsSlice';
import { setCurrentTime, setIsTestFinished } from './features/timer/timerSlice';
import { setWords, setTypedCharacters } from './features/words/wordsSlice';

export function useRestartTest() {
	const dispatch = useDispatch();

	const testTime = useSelector((state) => state.testTime.testTimeValue);

	const restartTest = () => {
		dispatch(setWPM(0));
		dispatch(setAccuracy(100));
		dispatch(setCurrentTime(testTime));
		dispatch(setWords([]));
		dispatch(setTypedCharacters(''));

		dispatch(setIsTestFinished(false));
	};

	return restartTest;
}
