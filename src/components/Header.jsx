import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTestTime, setCurrentTime } from '../features/timer/timerSlice';
import { useRestartTest } from '../utils';
import { setSettingsOpened } from '../features/settings/settingsSlice';

function TestTimeButton({
	duration,
	index,
	selectedButtonIndex,
	setSelectedButtonIndex,
}) {
	const dispatch = useDispatch();

	const restartTest = useRestartTest();

	const handleClick = () => {
		setSelectedButtonIndex(index);
		dispatch(setCurrentTime(duration));
		dispatch(setTestTime(duration));
		restartTest();
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
	const isTestFinished = useSelector(
		(state) => state.timer.isTestFinishedValue
	);

	const times = [15, 30, 60, 120];
	const [selectedButtonIndex, setSelectedButtonIndex] = useState(
		JSON.parse(localStorage.getItem('selectedButtonIndex')) || 0
	);

	useEffect(() => {
		if (isTestFinished) return;

		localStorage.setItem(
			'selectedButtonIndex',
			JSON.stringify(selectedButtonIndex)
		);

		dispatch(setTestTime(times[selectedButtonIndex]));
		dispatch(setCurrentTime(times[selectedButtonIndex]));
	}, [selectedButtonIndex, isTestFinished]);

	// TODO: weighter time icon
	return (
		<header className='container-column'>
			<div className='home container'>
				<h1 className='main-title'>Typing test</h1>
				<span
					className='settings-icon'
					onClick={() => dispatch(setSettingsOpened(true))}></span>
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
