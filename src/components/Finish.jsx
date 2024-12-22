import { useSelector } from 'react-redux';
import { useRestartTest } from '../utils';

export default function Finish() {
	// TODO: Make it prettier
	// TODO: generalize scss
	// TODO: modularize components

	const wpm = useSelector((state) => state.wpm.wpmValue);
	const accuracy = useSelector((state) => state.accuracy.accuracyValue);

	const restartTest = useRestartTest();

	return (
		<div className='finish'>
			<div>
				<h1 className='title'>Test finished</h1>

				<div className='results'>
					<span>WPM: {wpm}</span>
					<span>Accuracy: {accuracy}</span>
				</div>

				<button className='close-btn' onClick={restartTest}>
					Start again
				</button>
			</div>
		</div>
	);
}
