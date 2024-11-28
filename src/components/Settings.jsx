export default function Settings({ settingsOpened, setSettingsOpened }) {
	const handleClick = () => {
		if (settingsOpened) {
			setSettingsOpened(false);
		}
	};

	return (
		<div className="settings">
			<div className="menu container">
				<div className="options">
					<div className="container">
						<label htmlFor="color-theme">Color theme</label>
						<select name="color-theme" id="color-theme">
							<option value="onedark">OneDark</option>
							<option value="dracula">Dracula</option>
						</select>
					</div>
					<div className="container">
						<label htmlFor="language">Language</label>
						<select name="language" id="language">
							<option value="en">en</option>
							<option value="es">es</option>
						</select>
					</div>
				</div>
				<button className="close-btn" onClick={handleClick}>
					Save
				</button>
			</div>
		</div>
	);
}
