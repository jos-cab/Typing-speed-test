import Header from "./components/Header";
import Settings from "./components/Settings";
import Main from "./components/Main";
import { useState, useRef } from "react";

function App() {
	const [settingsOpened, setSettingsOpened] = useState(false);
	const [time, setTime] = useState(null);
	const testTime = useRef(null);

	return (
		<>
			<Header
				settingsOpened={settingsOpened}
				setSettingsOpened={setSettingsOpened}
				testTime={testTime}
				time={time}
				setTime={setTime}
			/>
			<Main testTime={testTime} time={time} setTime={setTime} />
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
