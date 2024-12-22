import { useSelector, useDispatch } from 'react-redux';
import { setSettingsOpened, setWordCount } from './settingsSlice';
import { useRestartTest } from '../../utils';

// TODO: make settings work

export default function Settings() {
	const dispatch = useDispatch();

	const restartTest = useRestartTest();
	const testType = useSelector((state) => state.testType.testTypeValue);
	const wordCount = useSelector((state) => state.testType.wordCountValue);

	const handleClose = () => {
		dispatch(setSettingsOpened(false));
		restartTest();
	};

	return (
		<div className='settings'>
			<div>
				<h1 className='title'>Settings</h1>
				<div className='options'>
					<div className='option'>
						<label htmlFor='color-theme'>Color theme</label>
						<select name='color-theme' id='color-theme'>
							<option value='onedark'>OneDark</option>
							<option value='dracula'>Dracula</option>
						</select>
					</div>
					<div className='option'>
						<label htmlFor='language'>Language</label>
						<select name='language' id='language'>
							<option value='en'>en</option>
							<option value='es'>es</option>
						</select>
					</div>
					<div className='option'>
						<label htmlFor='test-type'>Test type</label>
						<select name='test-type' id='test-type'>
							<option value='time'>Time</option>
							<option value='word'>Word</option>
						</select>
						<input
							type='number'
							name='wordCount'
							id='word-count'
							value={wordCount}
							onChange={(e) => {
								dispatch(setWordCount(e.target.value));
							}}
						/>
					</div>
				</div>
				<button className='close-btn' onClick={handleClose}>
					Save
				</button>
			</div>
		</div>
	);
}
