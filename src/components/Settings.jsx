export default function Settings({ setSettingsOpened }) {
	const handleClick = () => setSettingsOpened((prev) => !prev);

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
				</div>
				<button className='close-btn' onClick={handleClick}>
					Save
				</button>
			</div>
		</div>
	);
}
