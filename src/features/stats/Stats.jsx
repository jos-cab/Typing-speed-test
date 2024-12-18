import { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setWPM, setAccuracy } from './statsSlice';
import { Timer } from '../timer/Timer';
import { setIsTestFinished } from '../timer/timerSlice';

export function Stats() {
	const dispatch = useDispatch();

	const wpm = useSelector((state) => state.wpm.wpmValue);
	const accuracy = useSelector((state) => state.accuracy.accuracyValue);

	const testTime = useSelector((state) => state.testTime.testTimeValue);
	const currentTime = useSelector((state) => state.timer.currentTimeValue);
	const isRunning = useSelector((state) => state.timer.isRunningValue);

	const words = useSelector((state) => state.words.wordsValue);
	const typedCharacters = useSelector(
		(state) => state.typedCharacters.typedCharactersValue
	);

	const averageWordLength = useMemo(() => {
		return words?.length
			? words.reduce((acc, word) => acc + word.length, 0) / words.length
			: 0;
	}, [words]);

	useEffect(() => {
		if (!isRunning) return;

		if (currentTime <= 0) {
			dispatch(setIsTestFinished(true));

			return;
		}

		const typedLength = typedCharacters.length;
		const correctChars = words
			.join(' ')
			.slice(0, typedLength)
			.split('')
			.filter((char, index) => char === typedCharacters[index]).length;

		const accuracyValue = ((correctChars / typedLength) * 100).toFixed(1);
		dispatch(setAccuracy(typedLength === 0 ? 100 : accuracyValue));

		const elapsedTime = testTime - currentTime;
		dispatch(
			setWPM(
				elapsedTime > 0
					? Math.trunc(
							(typedLength / averageWordLength / elapsedTime) * 60
					  )
					: 0
			)
		);
	}, [
		typedCharacters,
		testTime,
		isRunning,
		currentTime,
		averageWordLength,
		dispatch,
	]);

	return (
		<div className='stats container'>
			<Timer />
			<span className='words-per-minute'>WPM: {wpm}</span>
			<span className='accuracy'>ACC: {accuracy}%</span>
		</div>
	);
}
