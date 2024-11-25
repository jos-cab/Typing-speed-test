import { useRef, useState } from "react";
import "./main.css";

function Stats() {
	const [timer, setTimer] = useState(30);
	const wpm = useRef(0);
	const accuracy = useRef(100);

	return (
		<div className="stats container">
			<span className="time">{timer}</span>
			<span className="wpm">{wpm.current}</span>
			<span className="accuracy">{accuracy.current}%</span>
		</div>
	);
}

function Words() {
	const typingArea = useRef(null);

	const characterListRef = useRef(null);

	const phrase =
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet purus et turpis placerat venenatis. Nulla facilisi. Curabitur vehicula, tortor id laoreet tempus, arcu justo euismod urna, id mollis erat odio in dui. Integer vel nulla at elit fringilla bibendum. Fusce cursus nisi ut risus gravida.";

	const characters = phrase.split("").map((char, index) => {
		return <span key={index}>{char}</span>;
	});

	const handleInput = (e) => {
		const modifiers = [
			"Control",
			"Alt",
			"Shift",
			"ArrowLeft",
			"ArrowRight",
			"ArrowUp",
			"ArrowDown",
		];
		const end = typingArea.current.selectionEnd;

		if (e.key === "Tab") {
			e.preventDefault();

			const start = typingArea.current.selectionStart;

			const updatedValue =
				typingArea.current.value.slice(0, start) +
				"\t" +
				typingArea.current.value.slice(start, end) +
				typingArea.current.value.slice(end);

			typingArea.current.value = updatedValue;

			typingArea.current.selectionStart =
				typingArea.current.selectionEnd = start + 1;
		}

		if (
			typingArea.current.value.length < phrase.length &&
			!modifiers.includes(e.key)
		) {
			const characterList =
				characterListRef.current.querySelectorAll("span");

			phrase[end] == e.key
				? characterList[end].classList.toggle("correct-character")
				: characterList[end].classList.toggle("incorrect-character");
		}

		// TODO: fix control + backspace
		if (e.key == "Backspace" && !modifiers.includes(e.key)) {
			const characterList =
				characterListRef.current.querySelectorAll("span");

			characterList.forEach((element, index) => {
				const charTyped =
					index < end - 1 ? typingArea.current.value[index] : null;

				if (charTyped) {
					charTyped == element
						? element.classList.add("correct-character")
						: element.classList.add("incorrect-character");
				} else {
					characterList[index].classList.remove(
						"correct-character",
						"incorrect-character"
					);
				}
			});
		}
	};

	return (
		<div className="words">
			<div ref={characterListRef} className="characters">
				{characters}
			</div>

			<textarea
				ref={typingArea}
				onKeyDown={(e) => handleInput(e)}
				className="typing-area"
				name="typing-area"
				spellCheck={false}
			></textarea>
		</div>
	);
}

export default function Main() {
	return (
		<main>
			<Stats />
			<Words />
		</main>
	);
}
