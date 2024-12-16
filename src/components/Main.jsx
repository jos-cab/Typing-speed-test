import { useState, useMemo, useEffect } from 'react';
import { Timer } from '../features/timer/Timer';
import { Words } from '../features/words/Words';
import { useSelector } from 'react-redux';

function Stats() {
	const testTime = useSelector((state) => state.testTime.testTimeValue);
	const currentTime = useSelector((state) => state.timer.currentTimeValue);
	const isRunning = useSelector((state) => state.timer.isRunningValue);

	const words = useSelector((state) => state.words.wordsValue);
	const typedCharacters = useSelector(
		(state) => state.typedCharacters.typedCharactersValue
	);

	const [accuracy, setAccuracy] = useState(100);
	const [wordsPerMinute, setWordsPerMinute] = useState(0);

	const averageWordLength = useMemo(() => {
		return words?.length
			? words.reduce((acc, word) => acc + word.length, 0) / words.length
			: 0;
	}, [words]);

	useEffect(() => {
		if (!isRunning || currentTime <= 0 || testTime <= 0) return;

		const typedLength = typedCharacters.length;
		const correctChars = words
			.join(' ')
			.slice(0, typedLength)
			.split('')
			.filter((char, index) => char === typedCharacters[index]).length;

		const accuracyValue = ((correctChars / typedLength) * 100).toFixed(1);
		setAccuracy(typedLength === 0 ? 100 : accuracyValue);

		const elapsedTime = testTime - currentTime;
		const wpm =
			elapsedTime > 0
				? Math.trunc(
						(typedLength / averageWordLength / elapsedTime) * 60
				  )
				: 0;
		setWordsPerMinute(wpm);
	}, [typedCharacters, testTime, isRunning, currentTime, averageWordLength]);

	return (
		<div className='stats container'>
			<Timer />
			<span className='words-per-minute'>{wordsPerMinute}</span>
			<span className='accuracy'>{accuracy}%</span>
		</div>
	);
}

export default function Main() {
	return (
		<main className='container-column'>
			<Stats />
			<Words />
		</main>
	);
}
