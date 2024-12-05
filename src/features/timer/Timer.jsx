import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrementCurrentTime } from "./timerSlice";

export function Timer() {
	const currentTime = useSelector((state) => state.timer.currentTimeValue);
	const dispatch = useDispatch();

	useEffect(() => {
		const interval = setInterval(() => {
			if (currentTime > 0) {
				dispatch(decrementCurrentTime());
			} else {
				clearInterval(interval);
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [currentTime]);

	return <span className="time">{currentTime}</span>;
}
