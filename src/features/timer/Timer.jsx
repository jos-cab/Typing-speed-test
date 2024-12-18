import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrementCurrentTime, setIsRunning } from './timerSlice';

export function Timer() {
	const currentTime = useSelector((state) => state.timer.currentTimeValue);
	const isRunning = useSelector((state) => state.timer.isRunningValue);

	const typedCharacters = useSelector(
		(state) => state.typedCharacters.typedCharactersValue
	);
	const words = useSelector((state) => state.words.wordsValue.join(' '));
	const dispatch = useDispatch();

	const timerRef = useRef(null);

	useEffect(() => {
		clearInterval(timerRef.current);

		if (isRunning && currentTime > 0) {
			timerRef.current = setInterval(() => {
				dispatch(decrementCurrentTime());
			}, 1000);
		} else {
			dispatch(setIsRunning(false));
		}

		return () => clearInterval(timerRef.current);
	}, [isRunning, currentTime]);

	useEffect(() => {
		if (typedCharacters.length === words.length) {
			dispatch(setIsRunning(false));
			clearInterval(timerRef.current);
		}
	}, [typedCharacters, words]);

	// I don't merge useEffects because it cause problems with the interval.
	// When I write timer stops.

	return <span className='time'>{currentTime}</span>;
}
