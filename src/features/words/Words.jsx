import selectedLanguage from "../../data/english.json";
import { useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTypedWords, setWords } from "./wordsSlice";
import { setIsRunning } from "../timer/timerSlice";

export function Words() {
	const words = useSelector((state) => state.words.wordsValue);
	const typedWords = useSelector((state) => state.typedWords.typedWordsValue);
	const currentTime = useSelector((state) => state.timer.currentTimeValue);
	const dispatch = useDispatch();

	const characterListRef = useRef(null);
	const wordList = selectedLanguage.words;

	useMemo(() => {
		const generateWords = () => {
			if (!wordList || wordList.length === 0) return "";

			const wordCount = 150;
			let words = "";

			for (let i = 0; i < wordCount; i++) {
				words +=
					wordList[Math.floor(Math.random() * wordList.length)] + " ";
			}

			return words.trim(); // Trim any trailing space.
		};

		dispatch(setWords(generateWords()));
	}, [wordList]);

	const characters = useMemo(() => {
		if (!words || words.length === 0) return [];

		return words.split("").map((char, index) => {
			const correct = typedWords[index] === char;

			return (
				<span
					key={index}
					className={
						typedWords[index]
							? correct
								? "correct-character"
								: "incorrect-character"
							: ""
					}
				>
					{char === " " && typedWords[index] && !correct ? "_" : char}
				</span>
			);
		});
	}, [typedWords, words]);

	// TODO: pensalize for errors

	const handleInput = (e) => {
		const newText = e.target.value;

		if (newText.length <= words.length) dispatch(setTypedWords(newText));
	};

	const handleFocus = () => {
		if (typedWords.length !== words.length) dispatch(setIsRunning(true));
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
				value={typedWords}
				onFocus={handleFocus}
				onBlur={() => dispatch(setIsRunning(false))}
				disabled={
					typedWords.length === words.length || currentTime <= 0
				}
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
