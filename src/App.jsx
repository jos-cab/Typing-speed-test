import "./App.css";
import "./themes/onedark.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Settings from "./components/Settings";
import { useState } from "react";

function App() {
	const [settingsOpened, setSettingsOpened] = useState(false);

	return (
		<>
			<Header
				settingsOpened={settingsOpened}
				setSettingsOpened={setSettingsOpened}
			/>
			<Main />
			{settingsOpened && (
				<Settings
					settingsOpened={settingsOpened}
					setSettingsOpened={setSettingsOpened}
				/>
			)}
		</>
	);
}

export default App;
