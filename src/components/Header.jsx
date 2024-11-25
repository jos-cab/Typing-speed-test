import { useRef } from "react";
import "./Header.css";

function TestTimeButton(time, index, buttonListRef, activeBtn) {
	const handleClick = (index) => {
		const buttonListNode = buttonListRef.current;
		const buttonList = buttonListNode.querySelectorAll("button");

		if (activeBtn.current != null)
			activeBtn.current.classList.toggle("active-btn");

		activeBtn.current = buttonList[index];
		activeBtn.current.classList.toggle("active-btn");
	};

	return (
		<button
			onClick={() => handleClick(index)}
			key={time}
			className="test-time-btn"
		>
			{time}
		</button>
	);
}

export default function Header() {
	const testTimes = [15, 30, 60, 120]; // Do not create two identical
	const buttonListRef = useRef(null);
	const activeBtn = useRef(null);

	const testTimeButtons = testTimes.map((time, index) =>
		TestTimeButton(time, index, buttonListRef, activeBtn)
	);

	return (
		<>
			<header>
				<div className="container">
					<h1 className="main-title">Typing test</h1>
					<img src="" alt="Settings" />
				</div>

				<div className="container button-list" ref={buttonListRef}>
					{testTimeButtons}
				</div>
			</header>
		</>
	);
}
