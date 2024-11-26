import { useEffect, useMemo, useRef, useState } from "react";
import "./main.css";

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

	const phrase =
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet purus et turpis placerat venenatis. Nulla facilisi. Curabitur vehicula, tortor id laoreet tempus, arcu justo euismod urna, id mollis erat odio in dui. Integer vel nulla at elit fringilla bibendum. Fusce cursus nisi ut risus gravida.";

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

		setTypedWords(newTypedWords);
	};

	return (
		<div className="words">
			<textarea
				onChange={handleInput}
				className="typing-area"
				name="typing-area"
				spellCheck={false}
				value={typedWords}
			/>

			<div ref={characterListRef} className="characters">
				{characters}
			</div>
		</div>
	);
}

export default function Main({ testTime, time, setTime }) {
	return (
		<main>
			<Stats testTime={testTime} time={time} setTime={setTime} />
			<Words />
		</main>
	);
}
