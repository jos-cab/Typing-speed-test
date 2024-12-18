import { Words } from '../features/words/Words';
import { Stats } from '../features/stats/Stats';

export default function Main() {
	return (
		<main className='container-column'>
			<Stats />
			<Words />
		</main>
	);
}
