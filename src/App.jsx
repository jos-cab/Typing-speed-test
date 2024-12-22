import Header from './components/Header';
import Settings from './components/Settings';
import Main from './components/Main';
import Finish from './components/Finish';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function App() {
	const [settingsOpened, setSettingsOpened] = useState(false);

	const isTestFinished = useSelector(
		(state) => state.timer.isTestFinishedValue
	);

	return (
		<>
			<Header setSettingsOpened={setSettingsOpened} />
			<Main />
			{settingsOpened && (
				<Settings setSettingsOpened={setSettingsOpened} />
			)}
			{isTestFinished && <Finish />}
		</>
	);
}
export default App;
