import Header from "./components/Header";
//import SettingsComp from "./components/Settings";
import Main from "./components/Main";
import { useState } from "react";

function App() {
	const [settingsOpened, setSettingsOpened] = useState(false);
	const [time, setTime] = useState(null);
	const [currentTime, setCurrentTime] = useState(null);

	return (
		<>
			<Header
				settingsOpened={settingsOpened}
				setSettingsOpened={setSettingsOpened}
				time={time}
				setTime={setTime}
				currentTime={currentTime}
				setCurrentTime={setCurrentTime}
			/>
			<Main
				time={time}
				setTime={setTime}
				currentTime={currentTime}
				setCurrentTime={setCurrentTime}
			/>
			{/* {settingsOpened && (
				<Settings
					settingsOpened={settingsOpened}
					setSettingsOpened={setSettingsOpened}
				/>
			)} */}
		</>
	);
}

export default App;
