import Header from './components/Header';
import Settings from './features/settings/Settings';
import Main from './components/Main';
import Finish from './components/Finish';
import { useSelector } from 'react-redux';

function App() {
	const settingsOpened = useSelector(
		(state) => state.settings.settingsOpenedValue
	);

	const isTestFinished = useSelector(
		(state) => state.timer.isTestFinishedValue
	);

	return (
		<>
			<Header />
			<Main />
			{settingsOpened && <Settings />}
			{isTestFinished && <Finish />}
		</>
	);
}
export default App;
