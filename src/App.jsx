import Header from './components/Header';
//import Settings from "./components/Settings";
import Main from './components/Main';
import Finish from './components/Finish';
import { useSelector } from 'react-redux';

function App() {
	//const [settingsOpened, setSettingsOpened] = useState(false);

	const isTestFinished = useSelector(
		(state) => state.timer.isTestFinishedValue
	);

	return (
		<>
			<Header />
			<Main />
			{/* {settingsOpened && (
				<Settings
					settingsOpened={settingsOpened}
					setSettingsOpened={setSettingsOpened}
				/>
			)} */}
			{isTestFinished && <Finish />}
		</>
	);
}
export default App;
