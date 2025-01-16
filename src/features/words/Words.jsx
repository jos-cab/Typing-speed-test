import selectedLanguage from '../../data/english.json';
import { useEffect, useMemo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTypedCharacters, setWords } from './wordsSlice';
import { setIsRunning, setIsTestFinished } from '../timer/timerSlice';

export function Words() {
	const words = useSelector((state) => state.words.wordsValue);
	const wordCount = useSelector((state) => state.testType.wordCountValue);
	const currentTime = useSelector((state) => state.timer.currentTimeValue);
	const typedCharacters = useSelector(
		(state) => state.typedCharacters.typedCharactersValue
	);
	const dispatch = useDispatch();

	const carretRef = useRef(null);
	const wordListRef = useRef(null);
	const typingAreaRef = useRef(null);

	const isDisabled =
		typedCharacters.length === words.join(' ').length || currentTime <= 0;

	const wordList = selectedLanguage.words;

	const generateWords = (wordCount) =>
		Array.from(
			{ length: wordCount },
			() => wordList[Math.floor(Math.random() * wordList.length)]
		);

	useEffect(() => {
		if (!words || words.length === 0) {
			dispatch(setWords(generateWords(wordCount)));
		}
	}, [words, dispatch]);

	const wordListComponents = useMemo(() => {
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

	useEffect(() => {
		// Calculate line lengths

		const inputText = typingAreaRef.current.value;
		const maxLineLength = wordListRef.current.offsetWidth;

		const linesLengths = [];
		const linesWordCounts = [];
		let currentLineLength = 0;

		let wordCount = 0;
		words.forEach((word) => {
			const wordLength = (word.length + 1) * 12;
			if (currentLineLength + wordLength >= maxLineLength) {
				linesLengths.push(currentLineLength - 12);
				linesWordCounts.push(wordCount);
				wordCount = 1;
				currentLineLength = wordLength;
			} else {
				currentLineLength += wordLength;
				wordCount++;
			}
		});

		if (currentLineLength > 0) {
			linesLengths.push(currentLineLength);
			linesWordCounts.push(wordCount);
		}

		// Calculate carret position

		let remainingLength = inputText.length * 12; // Caret position in pixels
		let currentLine = 0;

		for (let i = 0; i < linesLengths.length; i++) {
			if (remainingLength <= linesLengths[i]) {
				break;
			}
			remainingLength -= linesLengths[i] + 12;
			currentLine++;
		}

		if (currentLine === 2 && remainingLength === 0) {
			console.log(linesWordCounts);
			console.log(words);

			console.log(linesWordCounts.slice(0, currentLine - 1));

			const newWords = words.slice(
				linesWordCounts
					.slice(0, currentLine - 1)
					.reduce((a, b) => a + b)
			);

			const newInputText = inputText.slice(
				Math.floor(
					linesLengths
						.slice(0, currentLine - 1)
						.reduce((a, b) => a + b, 0) / 12
				)
			);

			dispatch(setWords(newWords));
			dispatch(setTypedCharacters(newInputText));
			console.log(typedCharacters);
		}

		// Animate carret while not typing

		carretRef.current.style.top = `${currentLine * 1.63 + 0.1}em`;
		carretRef.current.style.left = `${remainingLength}px`;
		carretRef.current.style.animation = `none`;

		const timeoutId = setTimeout(() => {
			carretRef.current.style.animation = `blink 0.3s alternate infinite both`;
		}, 500);

		return () => clearTimeout(timeoutId);
	}, [typedCharacters, words]);

	useEffect(() => {
		if (
			words.length > 0 &&
			typedCharacters.length === words.join(' ').length
		) {
			dispatch(setIsTestFinished(true));
		}
	}, [typedCharacters, words, dispatch]);

	const handleInput = (e) => {
		const inputText = e.target.value;

		if (inputText.length <= words.join(' ').length) {
			dispatch(setTypedCharacters(inputText));
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
				onClick={() => typingAreaRef.current.focus()}
				onChange={handleInput}
				onKeyDown={(e) => {
					if (e.key === 'Enter' || e.key === 'Tab') {
						e.preventDefault();
					}
				}}
				onMouseLeave={() => typingAreaRef.current.blur()}
				className='typing-area'
				name='typing-area'
				spellCheck={false}
				onCut={(e) => e.preventDefault()}
				onCopy={(e) => e.preventDefault()}
				onPaste={(e) => e.preventDefault()}
				value={typedCharacters}
				onFocus={handleFocus}
				onBlur={() => dispatch(setIsRunning(false))}
				disabled={isDisabled}
				aria-label='Typing area'
			/>

			<div ref={wordListRef} className='words'>
				{wordListComponents}
			</div>

			<div className='carret' ref={carretRef}></div>
		</div>
	);
}
