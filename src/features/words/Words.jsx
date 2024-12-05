import selectedLanguage from "../../data/english.json";
import { useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTypedWords, setWords } from "./wordsSlice";

export function Words() {
	const words = useSelector((state) => state.words.wordsValue);
	const typedWords = useSelector((state) => state.typedWords.typedWordsValue);
	const dispatch = useDispatch();

	const characterListRef = useRef(null);
	const wordList = selectedLanguage.words;

	useMemo(() => {
		const generateWords = () => {
			if (!wordList || wordList.length === 0) return "";

			const wordCount = 20;
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

	const handleInput = (e) => {
		const newText = e.target.value;

		if (newText.length <= words.length) dispatch(setTypedWords(newText));
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
