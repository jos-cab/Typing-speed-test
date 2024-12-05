import Header from "./components/Header";
//import SettingsComp from "./components/Settings";
import Main from "./components/Main";
import store from "./app/store";
import { Provider } from "react-redux";
//import { useState } from "react";

function App() {
	//const [settingsOpened, setSettingsOpened] = useState(false);

	return (
		<>
			<Provider store={store}>
				<Header />
				<Main />
				{/* {settingsOpened && (
				<Settings
					settingsOpened={settingsOpened}
					setSettingsOpened={setSettingsOpened}
				/>
			)} */}
			</Provider>
		</>
	);
}
export default App;
