import { useState, useMemo, useEffect } from 'react';
import { Timer } from '../features/timer/Timer';
import { Words } from '../features/words/Words';
import { useSelector } from 'react-redux';

// TODO: finish calulations after time is completed
// TODO: finish time when typing is done
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
		return words
			? words.reduce((acc, word) => acc + word.length, 0) / words.length
			: 0;
	}, [words]);

	useEffect(() => {
		if (currentTime > 0 && isRunning) {
			const numberCharactersTyped = typedCharacters.split('').length;
			const numberCharactersTypedWrong = typedCharacters
				.split('')
				.filter(
					(char, index) => char !== words.join(' ')[index]
				).length;

			const typingProgressRatio =
				numberCharactersTyped / averageWordLength;

			setWordsPerMinute(
				testTime === currentTime
					? 0
					: Math.trunc(
							(typingProgressRatio / (testTime - currentTime)) *
								60
					  )
			);

			setAccuracy(
				(
					((words.length - numberCharactersTypedWrong) /
						words.length) *
					100
				).toFixed(1) || 0
			);
		}
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
