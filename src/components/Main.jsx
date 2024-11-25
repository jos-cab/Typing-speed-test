import { useRef } from "react";
import "./main.css";

export default function Main() {
	const time = useRef(0);
	const wpm = useRef(0);
	const accuracy = useRef(100);

	const typingArea = useRef(null);

	const handleInput = (e) => {
		if (e.key === "Tab") {
			e.preventDefault();

			const start = typingArea.current.selectionStart;
			const end = typingArea.current.selectionEnd;

			const updatedValue =
				typingArea.current.value.slice(0, start) +
				"\t" +
				typingArea.current.value.slice(start, end) +
				typingArea.current.value.slice(end);

			typingArea.current.value = updatedValue;

			typingArea.current.selectionStart =
				typingArea.current.selectionEnd = start + 1;
		}
	};

	return (
		<main>
			<div className="stats container">
				<span className="time">{time.current}</span>
				<span className="wpm">{wpm.current}</span>
				<span className="accuracy">{accuracy.current}%</span>
			</div>
			<textarea
				ref={typingArea}
				onKeyDown={(e) => handleInput(e)}
				className="typing-area"
				name="typing-area"
			></textarea>
		</main>
	);
}
