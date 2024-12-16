import selectedLanguage from '../../data/english.json';
import { useMemo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTypedCharacters, setWords } from './wordsSlice';
import { setIsRunning } from '../timer/timerSlice';

export function Words() {
	const words = useSelector((state) => state.words.wordsValue);
	const currentTime = useSelector((state) => state.timer.currentTimeValue);
	const typedCharacters = useSelector(
		(state) => state.typedCharacters.typedCharactersValue
	);
	const dispatch = useDispatch();

	const carretRef = useRef(null);
	const wordListRef = useRef(null);
	const typingAreaRef = useRef(null);

	const wordList = selectedLanguage.words;

	useMemo(() => {
		const generateWords = () => {
			if (!wordList || wordList.length === 0) return [];

			const wordCount = 20;
			let words = [];

			for (let i = 0; i < wordCount; i++) {
				words.push(
					wordList[Math.floor(Math.random() * wordList.length)]
				);
			}

			return words;
		};

		dispatch(setWords(generateWords()));
	}, [wordList]);

	const wordListComponents = useMemo(() => {
		if (!words || words.length === 0) return [];

		let lastCharIndex = 0;

		return words.map((word, i) => {
			const letters = (word + ' ').split('').map((char, j) => {
				i === 0 ? (lastCharIndex = j) : (lastCharIndex += 1);

				const correct = typedCharacters[lastCharIndex] === char;

				return (
					<span
						key={char + i + j}
						className={
							'letter' +
							(typedCharacters[lastCharIndex]
								? correct
									? ' correct-character'
									: ' incorrect-character'
								: '')
						}>
						{char === ' ' &&
						!correct &&
						typedCharacters[lastCharIndex]
							? '_'
							: char}
					</span>
				);
			});

			return (
				<div key={word + i} className='word'>
					{letters}
				</div>
			);
		});
	}, [typedCharacters, words]);

	// TODO: pensalize for errors

	const handleInput = (e) => {
		const inputText = e.target.value;
		const maxLineLength = wordListRef.current.offsetWidth;

		const linesLengths = [];
		let currentLineLength = 0;

		// Calculate lengths of all lines
		words.forEach((word) => {
			const wordLength = (word.length + 1) * 12;
			if (currentLineLength + wordLength >= maxLineLength) {
				linesLengths.push(currentLineLength - 12);
				currentLineLength = wordLength;
			} else {
				currentLineLength += wordLength;
			}
		});

		if (currentLineLength > 0) linesLengths.push(currentLineLength);

		// Calculate the current line and caret position
		let remainingLength = inputText.length * 12; // Total caret position in pixels
		let currentLine = 0;

		for (let i = 0; i < linesLengths.length; i++) {
			if (remainingLength <= linesLengths[i]) {
				break; // Caret is on this line
			}
			remainingLength -= linesLengths[i] + 12;
			currentLine++;
		}

		if (inputText.length <= words.join(' ').length) {
			dispatch(setTypedCharacters(inputText));

			// Update caret position
			carretRef.current.style.top = `${currentLine * 1.65 + 0.1}em`;
			carretRef.current.style.left = `${remainingLength}px`;
		}
	};

	const handleFocus = () => {
		if (typedCharacters.split(' ').length !== words.join(' ').length)
			dispatch(setIsRunning(true));
	};

	return (
		<div className='word-list container-column'>
			<textarea
				ref={typingAreaRef}
				onMouseDown={(e) => e.preventDefault()}
				onClick={() => {
					typingAreaRef.current.focus();
				}}
				onChange={handleInput}
				className='typing-area'
				name='typing-area'
				spellCheck={false}
				onCut={(e) => e.preventDefault()}
				onCopy={(e) => e.preventDefault()}
				onPaste={(e) => e.preventDefault()}
				value={typedCharacters}
				onFocus={handleFocus}
				onBlur={() => dispatch(setIsRunning(false))}
				disabled={
					typedCharacters.length === words.join(' ').length ||
					currentTime <= 0
				}
			/>

			<div
				ref={wordListRef}
				onCopy={(e) => e.preventDefault()}
				className='words'>
				{wordListComponents}
			</div>

			<div className='carret' ref={carretRef}></div>
		</div>
	);
}
