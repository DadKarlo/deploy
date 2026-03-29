import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import UserDistanceCopy from './UserDistanceCopy'
import { API_site } from '../API_URL'

export default function AddZayvka(props) {
	const params = useParams()
	const web = params.id //  domen/ web /
	const res = params.res //  domen/ 'web' / res

	const [lastname, setLastname] = useState('')
	const [birthday, setBirthday] = useState('')
	const [team, setTeam] = useState('')
	const [sex, setSex] = useState('Мужчины') //ranging
	useEffect(() => {
		!!props.enru ? setSex(`Men`) : setSex('Мужчины')
	}, [props.enru])

	const [addist1, setAddist1] = useState('') //ranging
	const [time1, setTime1] = useState({ mm: '', ss: '', ms: '' }) //Number
	const pushtime1 = ''.concat(
		time1.mm.padStart(2, '0'),
		time1.ss.padStart(2, '0'),
		time1.ms.padStart(2, '0'),
	)

	const [addist2, setAddist2] = useState('') //ranging
	const [time2, setTime2] = useState({ mm: '', ss: '', ms: '' }) //Number
	const pushtime2 = ''.concat(
		time2.mm.padStart(2, '0'),
		time2.ss.padStart(2, '0'),
		time2.ms.padStart(2, '0'),
	)

	const [data, setData] = useState(null)
	useEffect(() => {
		fetch(API_site + `/${web}`, { method: 'POST' })
			.then((res) => res.text())
			.then((data) => {
				setData(JSON.parse(data))
			})
			.catch((err) => console.log(err))
	}, [web])

	// console.log(data)

	const [isLoading, setIsLoading] = useState(false)
	const [isErr, setIsErr] = useState('')

	const Zayvka = async (e) => {
		e.preventDefault()
		setIsLoading(true)
		setIsErr('')
		try {
			const resl = await fetch(API_site + '/zayvka', {
				method: 'POST',
				body: JSON.stringify({
					id: web,
					control: res,
					firstname: '',
					group: '',
					category: '',
					lastname: lastname,
					birthday: birthday,
					team: team,
					sex: sex,
					distance1: addist1,
					TimeStart1: pushtime1,
					distance2: addist2,
					TimeStart2: pushtime2,
				}),
				headers: { 'Content-type': 'application/json' },
			})
			if (!resl.ok) {
				if (!resl.ok) {
					setIsErr(!props.enru ? 'Ошибка!' : 'Error')
					setTimeout(() => {
						setIsErr('')
					}, 1970)
				}
				throw new Error('Ошибка сети или сервера')
			}
			await resl.json()
			// console.log(result)
			setIsErr(!props.enru ? 'Успешно!' : 'Successfully!')
			setTimeout(() => {
				setIsErr('')
			}, 1970)
		} catch (error) {
			// console.log(error)
			setIsErr(!props.enru ? 'Ошибка!' : 'Error')
			setTimeout(() => {
				setIsErr('')
			}, 1970)
		}

		setIsLoading(false)
	} //sendForm

	return (
		<div>
			{isNaN(web) ? (
				(window.location.href = '/')
			) : res !== data?.FormURL ? (
				<div
					style={{
						fontSize: '2rem',
						margin: '2rem',
						border: '1px solid',
						padding: '5%',
						borderRadius: '2rem',
					}}
				>
					{!!props.enru
						? 'Registration of athletes' //===========================
						: 'Формы регистрации участника отсутствует!'}
				</div>
			) : (
				<form
					onSubmit={Zayvka}
					style={{
						padding: '3%',
						border: '1px solid',
						borderRadius: '5px',
						marginLeft: '5%',
						marginRight: '5%',
						marginTop: '1.5%',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<div
						style={{
							marginBottom: '1.4%',
							fontSize: '1.8rem',
							fontFamily: 'Arial',
							textAlign: 'center',
						}}
					>
						{!!props.enru
							? 'Registration of athletes' //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//
							: 'Регистрация участника'}
					</div>
					<input
						style={{
							padding: '3px',
							border: '1px solid',
							borderRadius: '5px',
							width: '80%',
							fontFamily: 'Arial',
							boxSizing: 'border-box',
							margin: '0.4rem',
							textAlign: 'center',
						}}
						type="text"
						name="lastname"
						pattern="[A-Za-zА-ЯЁа-яё\s]{1,50}"
						title={'Можно использовать A-z и А-я'}
						maxLength={50}
						value={lastname}
						onChange={(e) => setLastname(e.target.value)}
						placeholder={!!props.enru ? 'Name' : 'ФИО участника'}
						required
					/>
					<input
						style={{
							padding: '3px',
							border: '1px solid',
							borderRadius: '5px',
							width: '80%',
							fontFamily: 'Arial',
							boxSizing: 'border-box',
							marginBottom: '0.4rem',
							textAlign: 'center',
						}}
						type="text"
						name="birthday"
						value={birthday}
						maxLength={20}
						onChange={(e) => setBirthday(e.target.value)}
						placeholder={!!props.enru ? 'Birthday' : 'Дата рождения'}
					/>
					<input
						style={{
							padding: '3px',
							border: '1px solid',
							borderRadius: '5px',
							width: '80%',
							fontFamily: 'Arial',
							boxSizing: 'border-box',
							marginBottom: '0.4rem',
							textAlign: 'center',
						}}
						type="text"
						name="team"
						pattern="[A-Za-zА-ЯЁа-яё0-9\s\-\.\,\(\)]{1,20}"
						title={'Можно использовать A-z и А-я, символы: - , . ( )'}
						maxLength={20}
						value={team}
						onChange={(e) => setTeam(e.target.value)}
						placeholder={!!props.enru ? 'Team' : 'Командa'}
					/>
					<select
						style={{
							padding: '3px',
							border: '1px solid',
							borderRadius: '5px',
							width: '80%',
							fontFamily: 'Arial',
							boxSizing: 'border-box',
							marginBottom: '0.4rem',
							textAlign: 'center',
						}}
						value={sex}
						onChange={(e) => setSex(e.target.value)}
					>
						<option value={!!props.enru ? `Men` : 'Мужчины'}>
							{!!props.enru ? `Men` : 'Мужчины'}
						</option>
						<option value={!!props.enru ? `Women` : 'Женщины'}>
							{!!props.enru ? `Women` : 'Женщины'}
						</option>
					</select>
					<UserDistanceCopy
						enru={props.enru}
						dist={setAddist1}
						time={time1}
						setTime={setTime1}
					/>
					<UserDistanceCopy
						enru={props.enru}
						dist={setAddist2}
						time={time2}
						setTime={setTime2}
					/>
					<button
						style={{
							padding: '1px',
							borderRadius: '7px',
							width: '80%',
							color: 'white',
							backgroundColor: 'green',
							fontFamily: 'Arial',
							fontStyle: 'normal',
							boxSizing: 'border-box',
							fontSize: '1.1rem',
							cursor: 'pointer',
							marginBottom: '0.4rem',
						}}
						type="submit"
					>
						{!isErr
							? !isLoading
								? !props.enru
									? 'Зарегистрироваться'
									: 'Add a Swimmer'
								: '-  -  -'
							: `${isErr}`}
					</button>
					<button
						style={{
							padding: '1px',
							borderRadius: '7px',
							borderColor: 'red',
							width: '80%',
							color: 'white',
							backgroundColor: 'darkred',
							fontFamily: 'Arial',
							fontStyle: 'normal',
							boxSizing: 'border-box',
							fontSize: '1.1rem',
							cursor: 'pointer',
						}}
						type="button"
						onClick={() => window.location.reload()}
					>
						{!props.enru ? 'Очистить форму' : 'Clear'}
					</button>
				</form>
			)}
			<>{!props.enru ? 'Вопрос регистрации уточняйте у организаторов.' : 'v'}</>
		</div>
	)
}
