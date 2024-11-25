import { useRef } from "react";
import "./Header.css";

function SettingsIcon({ settingsOpened, setSettingsOpened }) {
	const handleClick = () => {
		if (!settingsOpened) {
			setSettingsOpened(true);
		}
	};

	return (
		<svg
			className="settings-icon"
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			viewBox="0 0 24 24"
			onClick={handleClick}
		>
			<g fill="none">
				<path
					fill="black"
					d="M10.75 2.567a2.5 2.5 0 0 1 2.5 0L19.544 6.2a2.5 2.5 0 0 1 1.25 2.165v7.268a2.5 2.5 0 0 1-1.25 2.165l-6.294 3.634a2.5 2.5 0 0 1-2.5 0l-6.294-3.634a2.5 2.5 0 0 1-1.25-2.165V8.366A2.5 2.5 0 0 1 4.456 6.2zM12 9a3 3 0 1 0 0 6a3 3 0 0 0 0-6"
				></path>
			</g>
		</svg>
	);
}

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

export default function Header({ settingsOpened, setSettingsOpened }) {
	const testTimes = [15, 30, 60, 120]; // Do not create two identical
	const buttonListRef = useRef(null);
	const activeBtn = useRef(null);

	const testTimeButtons = testTimes.map((time, index) =>
		TestTimeButton(time, index, buttonListRef, activeBtn)
	);

	return (
		<>
			<header>
				<div className="home container">
					<h1 className="main-title">Typing test</h1>
					<SettingsIcon
						settingsOpened={settingsOpened}
						setSettingsOpened={setSettingsOpened}
					/>
				</div>

				<div className="container button-list" ref={buttonListRef}>
					{testTimeButtons}
				</div>
			</header>
		</>
	);
}
