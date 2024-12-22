import { useSelector } from 'react-redux';
import { useRestartTest } from '../utils';

export default function Finish() {
	// TODO: Make it prettier
	// TODO: generalize scss
	// TODO: modularize components

	const wpm = useSelector((state) => state.wpm.wpmValue);
	const accuracy = useSelector((state) => state.accuracy.accuracyValue);
	const testType = useSelector((state) => state.testType.testTypeValue);
	const wordCount = useSelector((state) => state.testType.wordCountValue);
	const testTime = useSelector((state) => state.testTime.testTimeValue);
	const currentTime = useSelector((state) => state.timer.currentTimeValue);

	const timeElapsed = testTime - currentTime;

	const restartTest = useRestartTest();

	return (
		<div className='finish'>
			<div>
				<h1 className='title'>Test finished</h1>

				<div className='results'>
					<span>Test type: {testType}</span>
					{testType === 'words' && (
						<>
							<span>Word count: {wordCount}</span>
							<span>Time: {timeElapsed}</span>
						</>
					)}
					{testType === 'time' && <span>Time: {testTime}</span>}
					<span>WPM: {wpm}</span>
					<span>Accuracy: %{accuracy}</span>
				</div>

				<button className='close-btn' onClick={restartTest}>
					Start again
				</button>
			</div>
		</div>
	);
}
