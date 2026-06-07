import { useParams } from 'react-router-dom'
import HronoStart from './HronoStart'
import Hronometrist from './Hronometrist'

export default function HronoSelect(props) {
	const hrono = [
		{ URL: '0-start', ids: '1', idz: '1', ind: 0, timeStart: 1774638741456 },
		{ URL: '1-', timeFinish: 0 },
		{ URL: '2-', timeFinish: 1774638741336 },
		{ URL: '3-', timeFinish: 1774638741236 },
		{ URL: '4-', timeFinish: 1774638741136 },
		{ URL: '5-', timeFinish: 1774638741636 },
		{ URL: '6-', timeFinish: 0 },
		{ URL: '7-', timeFinish: 1774638741836 },
		{ URL: '8-', timeFinish: 1774638741936 },
		{ URL: '9-', timeFinish: 1774638741936 },
		{ URL: '0-', timeFinish: 1774638741936 },
	]

	const params = useParams()
	const res = params.res //  domen/ 'web' / res

	switch (res) {
		case hrono[1].URL:
			return <Hronometrist idr={1} ind={hrono[0]} hrono={hrono[1].timeFinish} />
		case hrono[2].URL:
			return <Hronometrist idr={2} ind={hrono[0]} hrono={hrono[2].timeFinish} />
		case hrono[3].URL:
			return <Hronometrist idr={3} ind={hrono[0]} hrono={hrono[3].timeFinish} />
		case hrono[4].URL:
			return <Hronometrist idr={4} ind={hrono[0]} hrono={hrono[4].timeFinish} />
		case hrono[5].URL:
			return <Hronometrist idr={5} ind={hrono[0]} hrono={hrono[5].timeFinish} />
		case hrono[6].URL:
			return <Hronometrist idr={6} ind={hrono[0]} hrono={hrono[6].timeFinish} />
		case hrono[7].URL:
			return <Hronometrist idr={7} ind={hrono[0]} hrono={hrono[7].timeFinish} />
		case hrono[8].URL:
			return <Hronometrist idr={8} ind={hrono[0]} hrono={hrono[8].timeFinish} />
		case hrono[9].URL:
			return <Hronometrist idr={9} ind={hrono[0]} hrono={hrono[9].timeFinish} />
		case hrono[10].URL:
			return (
				<Hronometrist idr={0} ind={hrono[0]} hrono={hrono[10].timeFinish} />
			)
		case hrono[0].URL:
			return <HronoStart ind={hrono[0]} />

		default:
			return <div>Hronometrist not found</div>
	}
}
