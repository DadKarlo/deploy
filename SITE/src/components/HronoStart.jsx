import { useState } from 'react'
import Select from 'react-select'
import { API_site } from '../API_URL'

export default function HronoStart(props) {
	const dist = [
		{ value: '1', label: '1' },
		{ value: '2', label: '2' },
		{ value: '3', label: '3' },
		{ value: '4', label: '4' },
		{ value: '5', label: '5' },
	]
	const zapl = [
		{ value: '1', label: '1' },
		{ value: '2', label: '2' },
		{ value: '3', label: '3' },
		{ value: '4', label: '4' },
		{ value: '5', label: '5' },
	]
	const [sel, setSel] = useState(null)
	const [sel2, setSel2] = useState(null)
	const [butt, setButt] = useState(true)

	const startButton = async (e) => {
		e.preventDefault()
		setButt((i) => !i)
		const localStart = Date.now()

		try {
			const res = await fetch(API_site + '/timestap')
			const timeServer = await res.json()

			const localEnd = Date.now()
			const latency = (localEnd - localStart) / 2

			const timeStart = timeServer.timeServer - latency
			console.log(localStart, 'localStart')
			console.log(localEnd, 'localEnd')
			console.log(timeServer, 'timeServer')
			console.log(latency, 'latency')
			console.log(timeStart, 'timeStart')
		} catch (error) {
			const timeStart = localStart
			console.log(timeStart, 'timeStart')
		}
	}

	return (
		<div style={{}}>
			<h1 style={{ margin: '1rem' }}>Стартер</h1>
			<hr />
			{/* <select value={sel}>
				<option value="" disabled hidden>
					Дистанция
				</option>
				{mart.map((u) => (
					<option key={u} value={u}>
						{u}
					</option>
				))}
			</select> */}
			<div
				style={{
					width: '90%',
					margin: 'auto',
					maxWidth: '700px',
				}}
			>
				<Select
					placeholder="Дистанция"
					value={sel}
					onChange={setSel}
					options={dist}
					isSearchable
					isClearable
				/>
				<Select
					placeholder="Заплыв"
					value={sel2}
					onChange={setSel2}
					options={zapl}
					isSearchable
					isClearable
					isDisabled={!sel}
				/>
			</div>
			{/* <select value={sel}>
				<option value="" disabled hidden>
					Заплыв
				</option>
				{mart.map((u) => (
					<option key={u} value={u}>
						{u}
					</option>
				))}
			</select> */}
			{butt ? (
				<button
					onClick={startButton}
					style={{
						width: '90%',
						maxWidth: '800px',
						height: '9rem',
						marginTop: '2rem',
						backgroundColor: 'darkgreen',
						color: 'white',
						fontSize: '3em',
					}}
				>
					<span>Start</span>
				</button>
			) : (
				<button
					onDoubleClick={() => setButt((i) => !i)}
					style={{
						width: '90%',
						maxWidth: '800px',
						height: '9rem',
						marginTop: '2rem',
						backgroundColor: 'red',
						color: 'black',
						fontSize: '4em',
					}}
				>
					<span>Reset</span>
				</button>
			)}
		</div>
	)
}
