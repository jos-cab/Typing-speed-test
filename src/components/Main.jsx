import { useState, useRef, useMemo, useEffect } from "react";

function Stats({ time, setTime, currentTime, setCurrentTime }) {
	const [accuracy, setAccuracy] = useState(100);
	const [wordsPerMinute, setWordsPerMinute] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			if (currentTime > 0) {
				setCurrentTime((prev) => prev - 1);
			} else {
				clearInterval(interval);
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [currentTime]);

	return (
		<div className="stats container">
			<span className="time">{currentTime}</span>
			<span className="words-per-minute">{wordsPerMinute}</span>
			<span className="accuracy">{accuracy}%</span>
		</div>
	);
}

function Words() {
	const [typedText, setTypedText] = useState("");
	const characterListRef = useRef(null);

	const phrase =
		"The quick brown fox jumps over the lazy dog. The five boxing wizards jump quickly.";

	const characters = useMemo(
		() =>
			phrase.split("").map((_, index) => (
				<span
					key={index}
					className={
						typedText[index]
							? typedText[index] === phrase[index]
								? "correct-character"
								: "incorrect-character"
							: ""
					}
				>
					{phrase[index] === " " &&
					typedText[index] !== phrase[index] &&
					typedText[index]
						? "_"
						: phrase[index]}
				</span>
			)),
		[typedText, phrase]
	);

	const handleInput = (event) => {
		const newText = event.target.value;

		if (event.key === "Tab") {
			event.preventDefault();
			setTypedText((prev) => prev + "\t");
			return;
		}

		if (newText.length <= phrase.length) setTypedText(newText);
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
	useEffect(() => {
		setCurrentTime(time);
	}, [time]);

	return (
		<main className="container-column">
			<Stats
				time={time}
				setTime={setTime}
				currentTime={currentTime}
				setCurrentTime={setCurrentTime}
			/>
			<Words />
		</main>
	);
}
