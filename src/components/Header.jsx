import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTestTime, setCurrentTime } from '../features/timer/timerSlice';

function SettingsIcon({ isSettingsOpen, setIsSettingsOpen }) {
	const handleClick = () => setIsSettingsOpen((prev) => !prev);

	return (
		<svg
			className='settings-icon'
			xmlns='http://www.w3.org/2000/svg'
			width='1em'
			height='1em'
			viewBox='0 0 24 24'
			onClick={handleClick}>
			<g fill='none'>
				<path
					fill='black'
					d='M10.75 2.567a2.5 2.5 0 0 1 2.5 0L19.544 6.2a2.5 2.5 0 0 1 1.25 2.165v7.268a2.5 2.5 0 0 1-1.25 2.165l-6.294 3.634a2.5 2.5 0 0 1-2.5 0l-6.294-3.634a2.5 2.5 0 0 1-1.25-2.165V8.366A2.5 2.5 0 0 1 4.456 6.2zM12 9a3 3 0 1 0 0 6a3 3 0 0 0 0-6'></path>
			</g>
		</svg>
	);
}

function TestTimeButton({
	duration,
	index,
	selectedButtonIndex,
	setSelectedButtonIndex,
}) {
	const dispatch = useDispatch();

	const handleClick = () => {
		setSelectedButtonIndex(index);
		dispatch(setCurrentTime(duration));
		dispatch(setTestTime(duration));
	};

	return (
		<button
			onClick={handleClick}
			className={`test-time-btn ${
				selectedButtonIndex === index ? 'active-btn' : ''
			}`}>
			{duration}
		</button>
	);
}

function Header() {
	const dispatch = useDispatch();

	const times = [15, 30, 60, 120];
	const [selectedButtonIndex, setSelectedButtonIndex] = useState(
		JSON.parse(localStorage.getItem('selectedButtonIndex')) || 0
	);

	useEffect(() => {
		localStorage.setItem(
			'selectedButtonIndex',
			JSON.stringify(selectedButtonIndex)
		);

		dispatch(setTestTime(times[selectedButtonIndex]));
		dispatch(setCurrentTime(times[selectedButtonIndex]));
	}, [selectedButtonIndex, times]);

	return (
		<header className='container-column'>
			<div className='home container'>
				<h1 className='main-title'>Typing test</h1>
				{/* <SettingsIcon
					isSettingsOpen={settingsOpened}
					setIsSettingsOpen={setSettingsOpened}
				/> */}
			</div>

			<div className='button-list container'>
				<div className='time'></div>
				{times.map((duration, index) => (
					<TestTimeButton
						key={duration}
						duration={duration}
						index={index}
						selectedButtonIndex={selectedButtonIndex}
						setSelectedButtonIndex={setSelectedButtonIndex}
					/>
				))}
			</div>
		</header>
	);
}

export default Header;
