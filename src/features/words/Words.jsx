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
		const newText = e.target.value;

		//console.log(newText.length);

		if (newText.length <= words.join(' ').length) {
			dispatch(setTypedCharacters(newText));

			carretRef.current.style.left = `${
				e.target.selectionStart * 0.75
			}rem`;
		}
	};

	const handleFocus = () => {
		if (typedCharacters.split(' ').length !== words.join(' ').length)
			dispatch(setIsRunning(true));
	};

	return (
		<div className='word-list container-column'>
			<textarea
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
