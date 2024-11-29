import { useState, useRef, useMemo, useEffect } from "react";
import selectedLanguage from "../data/english.json";

// TODO: finish calulations after time is completed
// TODO: finish time when typing is done
function Stats({
	time,
	setTime,
	currentTime,
	setCurrentTime,
	phrase,
	numberCharactersTyped,
	setNumberCharactersTyped,
	numberCharactersTypedWrong,
	setNumberCharactersTypedWrong,
}) {
	const [accuracy, setAccuracy] = useState(100);
	const [wordsPerMinute, setWordsPerMinute] = useState(0);
	const averageWordLength = useMemo(() => {
		return phrase
			? phrase.split(" ").reduce((acc, word) => acc + word.length, 0) /
					phrase.split(" ").length
			: 0;
	}, [phrase]);

	useEffect(() => {
		const interval = setInterval(() => {
			if (currentTime > 0) {
				setCurrentTime((prev) => prev - 1);
			} else {
				clearInterval(interval);
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [currentTime, setCurrentTime]);

	useEffect(() => {
		if (currentTime > 0) {
			const totalWords = numberCharactersTyped / averageWordLength;
			setWordsPerMinute(
				Math.trunc((totalWords / (time - currentTime)) * 60) || 0
			);
			setAccuracy(
				(
					((phrase.length - numberCharactersTypedWrong) /
						phrase.length) *
					100
				).toFixed(1) || 0
			);
		}
	}, [numberCharactersTyped, time, currentTime, averageWordLength]);

	return (
		<div className="stats container">
			<span className="time">{currentTime}</span>
			<span className="words-per-minute">{wordsPerMinute}</span>
			<span className="accuracy">{accuracy}%</span>
		</div>
	);
}

function Words({
	phrase,
	typedText,
	setTypedTextRef,
	setNumberCharactersTyped,
	setNumberCharactersTypedWrong,
}) {
	const characterListRef = useRef(null);

	const characters = useMemo(() => {
		if (!phrase || phrase.length === 0) return []; // Ensure phrase is valid.
		return phrase.split("").map((char, index) => {
			const correct = typedText[index] === char;
			return (
				<span
					key={index}
					className={
						typedText[index]
							? correct
								? "correct-character"
								: "incorrect-character"
							: ""
					}
				>
					{char === " " && typedText[index] && !correct ? "_" : char}
				</span>
			);
		});
	}, [typedText, phrase]);

	const handleInput = (event) => {
		const newText = event.target.value;

		if (newText.length <= phrase?.length) setTypedTextRef(newText);

		setNumberCharactersTyped(newText.length);
		setNumberCharactersTypedWrong(
			newText.split("").filter((char, index) => char !== phrase[index])
				.length
		);
	};

	return (
		<div className="words container-column">
			<textarea
				onChange={handleInput}
				className="typing-area"
				name="typing-area"
				spellCheck={false}
				onCut={(e) => e.preventDefault()}
				onCopy={(e) => e.preventDefault()}
				onPaste={(e) => e.preventDefault()}
				value={typedText}
				//onFocus={e} // TODO start calculating time wpm and accuracy on focus stop when mousemove
			/>

			<div
				ref={characterListRef}
				onCopy={(e) => e.preventDefault()}
				className="characters"
			>
				{characters}
			</div>
		</div>
	);
}

export default function Main({ time, setTime, currentTime, setCurrentTime }) {
	const [numberCharactersTyped, setNumberCharactersTyped] = useState(0);
	const [numberCharactersTypedWrong, setNumberCharactersTypedWrong] =
		useState(0);
	const typedTextRef = useRef("");
	const setTypedTextRef = (newText) => (typedTextRef.current = newText);

	const wordList = selectedLanguage.words;

	const phrase = useMemo(() => {
		if (!wordList || wordList.length === 0) return ""; // Safeguard against empty or undefined word lists.
		let phrase = "";

		for (let i = 0; i < 20; i++) {
			phrase +=
				wordList[Math.floor(Math.random() * wordList.length)] + " ";
		}

		setTypedTextRef("");
		setNumberCharactersTyped(0);
		return phrase.trim(); // Trim any trailing space.
	}, [wordList]);

	useEffect(() => {
		setCurrentTime(time);
	}, [time, setCurrentTime]);

	return (
		<main className="container-column">
			<Stats
				time={time}
				setTime={setTime}
				currentTime={currentTime}
				setCurrentTime={setCurrentTime}
				phrase={phrase}
				typedTextRef={typedTextRef.current}
				setTypedTextRef={setTypedTextRef}
				numberCharactersTyped={numberCharactersTyped}
				setNumberCharactersTyped={setNumberCharactersTyped}
				numberCharactersTypedWrong={numberCharactersTypedWrong}
				setNumberCharactersTypedWrong={setNumberCharactersTypedWrong}
			/>
			<Words
				phrase={phrase}
				typedText={typedTextRef.current}
				setTypedTextRef={setTypedTextRef}
				setNumberCharactersTyped={setNumberCharactersTyped}
				setNumberCharactersTypedWrong={setNumberCharactersTypedWrong}
			/>
		</main>
	);
}
