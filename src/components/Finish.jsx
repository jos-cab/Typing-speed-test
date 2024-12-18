import { useSelector, useDispatch } from 'react-redux';
import { setWPM, setAccuracy } from '../features/stats/statsSlice';
import {
	setCurrentTime,
	setIsTestFinished,
} from '../features/timer/timerSlice';
import { setWords, setTypedCharacters } from '../features/words/wordsSlice';

export default function Finish() {
	const wpm = useSelector((state) => state.wpm.wpmValue);
	const accuracy = useSelector((state) => state.accuracy.accuracyValue);
	const currentTime = useSelector((state) => state.timer.currentTimeValue);
	const testTime = useSelector((state) => state.testTime.testTimeValue);

	const dispatch = useDispatch();

	const restartTest = () => {
		dispatch(setWPM(0));
		dispatch(setAccuracy(100));
		dispatch(setCurrentTime(testTime));
		dispatch(setWords([]));
		dispatch(setTypedCharacters(''));

		dispatch(setIsTestFinished(false));
	};

	return (
		<div className='finish'>
			<div className='container-column'>
				<h1 className='title'>Test finished</h1>

				<div className='result container-column'>
					<div className='container'>
						<p>WPM:</p>
						<p>{wpm}</p>
					</div>
					<div className='container'>
						<p>Accuracy:</p>
						<p>{accuracy}%</p>
					</div>
					<div className='container'>
						<p>Time:</p>
						<p>{currentTime}</p>
					</div>
					<div className='container'>
						<p>Test time:</p>
						<p>{testTime}</p>
					</div>
				</div>

				<button className='close-btn' onClick={restartTest}>
					Start again
				</button>
			</div>
		</div>
	);
}
