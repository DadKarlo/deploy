import { useEffect, useState } from 'react'
import '../App.css'
import FormSetup from './FormSetup'
import FormUser from './UserForm'
import PositionDistance from './PositionDistance'
import ShowUserStart from './ShowUserStart'
import ShowUserFinish from './ShowUserFinish'
import { API_site } from '../API_URL'
import {
	Badge,
	BottomNavigation,
	BottomNavigationAction,
	Box,
	Collapse,
	Alert,
} from '@mui/material'
import { Groups, PersonAddAlt1, Pool, Settings } from '@mui/icons-material'
import ShowZayvka from './ShowZayvka'
//p {!!props.enru ? 'EN' : 'RU'}

function Home(props) {
	const [data, setDate] = useState([]) //ferst render
	//const [sse, setSse] = useState(true)
	useEffect(() => {
		if (props.www) {
			setDate(JSON.parse(props.www))
		}
	}, [props.www])

	useEffect(() => {
		if (data?.setup?.NameTitle) {
			if (data?.setup?.NameTitle !== ''.trim()) {
				document.title = `${data?.setup?.NameTitle}`
			}
		} else {
			document.title = 'Соревнования по плаванию | Competitive Swimming'
		}
	}, [data])

	useEffect(() => {
		//!!!
		const user = new URL(document.URL)
		const sse = new EventSource(API_site + `${user.pathname}`) //!!!SSE variant
		sse.onopen = () => {
			// console.log('onopen')
			props.sse(true)
		}
		sse.onmessage = async (e) => {
			const data = await JSON.parse(e.data)
			// console.log(data, 'sse')
			setDate(data)
		}
		sse.onerror = (err) => {
			props.sse(false)
			// console.log(err)
		}
		return () => {
			sse.close()
			props.sse(false)
			// console.log('close')
		}
	}, []) //!!!SSE

	const [formSetup, setFormSetup] = useState(true)
	// const setformSetup = () => setFormSetup((i) => !i)
	const setformSetup = () => setFormSetup((i) => i)
	const [formUser, setFormUser] = useState(true)
	// const setformUser = () => setFormUser((i) => !i)
	const setformUser = () => setFormUser((i) => i)
	const [positionDistance, setPositionDistance] = useState(true)
	const setpositionDistance = () => setPositionDistance((i) => i)
	// const setpositionDistance = () => setPositionDistance((i) => !i)

	const [show, setShow] = useState(true)
	const setshow = () => setShow((i) => !i)

	const [menu, setMenu] = useState(0)

	const [alertInfo, setAlertInfo] = useState(true)
	setTimeout(() => {
		setAlertInfo(false)
	}, 5000)

	return (
		<div className="App">
			<Collapse in={alertInfo} style={alertInfo && { margin: '1rem' }}>
				<Alert onClose={() => setAlertInfo(false)}>
					Интервал обновления данных занимает до 5 секунд.
				</Alert>
			</Collapse>
			<Box>
				<BottomNavigation
					showLabels
					value={menu}
					onChange={(event, newValue) => {
						setMenu(newValue)
					}}
					style={{ margin: '1rem' }}
				>
					<BottomNavigationAction
						label={!!props.enru ? 'SwimStart' : 'SwimStart'}
						icon={<Pool />}
						style={{
							color: 'black',
							border: menu === 0 && '2px solid',
							borderRadius: '5px',
						}}
					/>
					<BottomNavigationAction
						label={!!props.enru ? 'AppPeople' : 'Добавить'}
						icon={<PersonAddAlt1 />}
						style={{
							color: 'black',
							border: menu === 1 && '2px solid',
							borderRadius: '5px',
						}}
					/>
					<BottomNavigationAction
						label={!!props.enru ? 'Settings' : 'Настройки'}
						icon={<Settings />}
						style={{
							color: 'black',
							border: menu === 2 && '2px solid',
							borderRadius: '5px',
						}}
					/>
					<BottomNavigationAction
						label={!!props.enru ? 'Application' : 'Участники'}
						icon={<Groups />}
						style={{
							color: 'black',
							border: menu === 3 && '2px solid',
							borderRadius: '5px',
						}}
					/>
					<Badge
						badgeContent={data?.zayvka?.length}
						color="success"
						overlap="circular"
					></Badge>
				</BottomNavigation>
			</Box>
			<div style={{ display: menu === 3 ? 'block' : 'none' }}>
				<>
					<ShowZayvka
						enru={props.enru}
						www={props.www}
						web={props.web}
						data={data}
					/>
					<br />
				</>
			</div>
			<div style={{ display: menu === 2 ? 'block' : 'none' }}>
				<>
					<button
						onClick={setformSetup}
						type="button"
						style={{
							border: '1px',
							fontSize: '1.3rem',
							width: '50%',
							fontFamily: 'Arial',
							backgroundColor: 'white',
							textAlign: 'center',
						}}
					>
						{!!props.enru ? 'Setting up Compitition' : 'Настройка Соревнований'}
					</button>
					{!!formSetup ? (
						<>
							<FormSetup
								web={props.web}
								www={props.www}
								data={data}
								enru={props.enru}
							/>
							<br />
						</>
					) : (
						<div style={{}}> . . . </div>
					)}

					<button
						onClick={setpositionDistance}
						type="button"
						style={{
							border: '1px',
							fontSize: '1.3rem',
							width: '50%',
							fontFamily: 'Arial',
							backgroundColor: 'white',
							textAlign: 'center',
						}}
					>
						{!!props.enru
							? 'Change the order of distances:'
							: 'Порядок следования дистанций:'}
					</button>
					{!!positionDistance ? (
						<>
							<PositionDistance
								web={props.web}
								www={props.www}
								data={data}
								enru={props.enru}
							/>
							<br />
						</>
					) : (
						<div style={{}}> . . . </div>
					)}
					<br />
				</>
			</div>
			<div style={{ display: menu === 1 ? 'block' : 'none' }}>
				<>
					<button
						onClick={setformUser}
						type="button"
						style={{
							border: '1px',
							fontSize: '1.3rem',
							width: '50%',
							fontFamily: 'Arial',
							backgroundColor: 'white',
							textAlign: 'center',
						}}
					>
						{!!props.enru
							? 'Registration of athletes'
							: 'Регистрация участника'}
					</button>
					{!!formUser ? (
						<>
							<FormUser web={props.web} enru={props.enru} />
							<br />
						</>
					) : (
						<div style={{}}> . . . </div>
					)}
					<br />
				</>
			</div>
			<div style={{ display: menu === 0 ? 'block' : 'none' }}>
				<>
					<button
						onClick={setshow}
						type="button"
						style={{
							border: '1px',
							fontSize: '1.3rem',
							width: '50%',
							fontFamily: 'Arial',
							backgroundColor: 'white',
							textAlign: 'center',
							whiteSpace: 'pre-wrap',
						}}
					>
						{!!show
							? !!props.enru
								? 'Start list'
								: 'Стартовый протокол\n( Заплывы )'
							: !!props.enru
								? 'Result card'
								: 'Итоговый протокол\n( Результаты )'}
					</button>
					<br />
					{!!show ? (
						<ShowUserStart
							web={props.web}
							www={props.www}
							data={data}
							enru={props.enru}
						/>
					) : (
						<ShowUserFinish
							web={props.web}
							www={props.www}
							data={data}
							enru={props.enru}
						/>
					)}
					<br />
				</>
			</div>
		</div>
	)
}

export default Home
