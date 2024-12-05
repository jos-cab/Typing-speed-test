import { useState, useMemo, useEffect } from "react";
import { Timer } from "../features/timer/Timer";
import { Words } from "../features/words/Words";
import { useSelector } from "react-redux";

// TODO: finish calulations after time is completed
// TODO: finish time when typing is done
function Stats() {
	const testTime = useSelector((state) => state.testTime.testTimeValue);
	const currentTime = useSelector((state) => state.timer.currentTimeValue);

	const words = useSelector((state) => state.words.wordsValue);
	const typedWords = useSelector((state) => state.typedWords.typedWordsValue);

	const [accuracy, setAccuracy] = useState(100);
	const [wordsPerMinute, setWordsPerMinute] = useState(0);

	const averageWordLength = useMemo(() => {
		return words
			? words.split(" ").reduce((acc, word) => acc + word.length, 0) /
					words.split(" ").length
			: 0;
	}, [words]);

	useEffect(() => {
		if (currentTime > 0) {
			const numberCharactersTyped = typedWords.split("").length;
			const numberCharactersTypedWrong = typedWords
				.split("")
				.filter(
					(char, index) => char !== words.split("")[index]
				).length;

			const typingProgressRatio =
				numberCharactersTyped / averageWordLength;

			setWordsPerMinute(
				Math.trunc(
					(typingProgressRatio / (testTime - currentTime)) * 60
				) || 0
			);

			setAccuracy(
				(
					((words.length - numberCharactersTypedWrong) /
						words.length) *
					100
				).toFixed(1) || 0
			);
		}
	}, [typedWords, testTime, currentTime, averageWordLength]);

	return (
		<div className="stats container">
			<Timer />
			<span className="words-per-minute">{wordsPerMinute}</span>
			<span className="accuracy">{accuracy}%</span>
		</div>
	);
}

export default function Main() {
	return (
		<main className="container-column">
			<Stats />
			<Words />
		</main>
	);
}
