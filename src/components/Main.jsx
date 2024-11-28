import { useEffect, useMemo, useRef, useState } from "react";

function Stats({ testTime, time, setTime }) {
	const wpm = useRef(0);
	const accuracy = useRef(100);

	useEffect(() => {
		setTime(testTime.current);
	}, []);

	return (
		<div className="stats container">
			<span className="time">{time}</span>
			<span className="wpm">{wpm.current}</span>
			<span className="accuracy">{accuracy.current}%</span>
		</div>
	);
}

function Words() {
	const [typedWords, setTypedWords] = useState("");
	const characterListRef = useRef(null);

	const phrase = "The quick brown fox jumps over the lazy dog.";

	const characters = useMemo(
		() =>
			phrase.split("").map((_, index) => (
				<span
					key={index}
					className={
						typedWords[index]
							? typedWords[index] === phrase[index]
								? "correct-character"
								: "incorrect-character"
							: ""
					}
				>
					{phrase[index] !== typedWords[index] && typedWords[index]
						? typedWords[index]
						: phrase[index]}
				</span>
			)),
		[typedWords, phrase]
	);

	const handleInput = (e) => {
		const newTypedWords = e.target.value;

		if (e.key === "Tab") {
			e.preventDefault();
			setTypedWords((prev) => prev + "\t");
			return;
		}

		if (newTypedWords.length <= phrase.length) setTypedWords(newTypedWords);
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

export default function Main({ testTime, time, setTime }) {
	return (
		<main className="container-column">
			<Stats testTime={testTime} time={time} setTime={setTime} />
			<Words />
		</main>
	);
}
