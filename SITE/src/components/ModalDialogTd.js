import { useEffect, useState } from 'react'
import UserDistanceModal from './UserDistanceModal'
import { API_site } from '../API_URL'

export default function ModalDialogTd(props) {
	const [lastname, setLastname] = useState(props.item.lastname)
	const [birthday, setBirthday] = useState(props.item.birthday)
	const [team, setTeam] = useState(props.item.team)
	const [sex, setSex] = useState('Мужчины') //ranging
	const [category, setCategory] = useState(props.item.category) //ranging
	const [group, setGroup] = useState(props.item.group) //ranging

	useEffect(() => {
		!!props.enru ? setSex(`Men`) : setSex('Мужчины')
	}, [props.enru])

	const [addist1, setAddist1] = useState(props.item.distance) //ranging
	const [time1, setTime1] = useState({
		mm: props.item.TimeStart.slice(0, 2),
		ss: props.item.TimeStart.slice(2, 4),
		ms: props.item.TimeStart.slice(4, 6),
	}) //Number
	const pushtime1 = ''.concat(
		time1.mm.padStart(2, '0'),
		time1.ss.padStart(2, '0'),
		time1.ms.padStart(2, '0'),
	)

	// const [isLoading, setIsLoading] = useState(false)
	const onSubmitForm = async (e) => {
		e.preventDefault()
		// setIsLoading(true)
		try {
			const res = await fetch(API_site + '/setuser', {
				method: 'POST',
				body: JSON.stringify({
					id: props.web,
					swimmer: props.item.id,
					firstname: '',
					lastname,
					birthday,
					team,
					sex,
					group,
					category,
					distance: addist1,
					TimeStart: pushtime1,
				}),
				headers: { 'Content-type': 'application/json' },
			})

			if (!res.ok) {
				alert(
					'Данные не были изменены! \nПроверьте соединение с интернетом и повторите редактирование! ',
				)
			}
			// const result = await res.json()
		} catch (error) {
			alert(
				'Данные не были изменены! \nПроверьте соединение с интернетом и повторите редактирование! ',
			)
		}
		// setIsLoading(false)
	}

	return (
		<form
			ref={props.refForm}
			onSubmit={onSubmitForm}
			style={{ overflow: 'hidden' }}
		>
			<button type="submit" style={{ display: 'none' }} />
			<input
				style={{
					padding: '3px',
					border: '1px solid',
					borderRadius: '5px',
					width: '100%',
					fontFamily: 'Arial',
					boxSizing: 'border-box',
					textAlign: 'center',
					marginBottom: '0.3rem',
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
			></input>
			<input
				style={{
					padding: '3px',
					border: '1px solid',
					borderRadius: '5px',
					width: '100%',
					fontFamily: 'Arial',
					boxSizing: 'border-box',
					textAlign: 'center',
					marginBottom: '0.3rem',
				}}
				type="text"
				name="birthday"
				maxLength={20}
				value={birthday}
				onChange={(e) => setBirthday(e.target.value)}
				placeholder={!!props.enru ? 'Birthday' : 'Дата рождения'}
			></input>
			<input
				style={{
					padding: '3px',
					border: '1px solid',
					borderRadius: '5px',
					width: '100%',
					fontFamily: 'Arial',
					boxSizing: 'border-box',
					textAlign: 'center',
					marginBottom: '0.3rem',
				}}
				type="text"
				name="team"
				pattern="[A-Za-zА-ЯЁа-яё0-9\s\-\.\,\(\)]{1,20}"
				title={'Можно использовать A-z и А-я, символы: - , . ( )'}
				maxLength={20}
				onChange={(e) => setTeam(e.target.value)}
				value={team}
				placeholder={!!props.enru ? 'Team' : 'Командa'}
			></input>

			<select
				style={{
					padding: '3px',
					border: '1px solid',
					borderRadius: '5px',
					width: '100%',
					fontFamily: 'Arial',
					boxSizing: 'border-box',
					textAlign: 'center',
					marginBottom: '0.3rem',
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
				<option value={!!props.enru ? `Girls` : 'Девушки'}>
					{!!props.enru ? `Girls` : 'Девушки'}
				</option>
				<option value={!!props.enru ? `Boys` : 'Юноши'}>
					{!!props.enru ? `Boys` : 'Юноши'}
				</option>
				<option value={!!props.enru ? ` ` : ' '}>
					{!!props.enru ? `Other` : 'Другое'}
				</option>
			</select>

			<input
				style={{
					padding: '3px',
					border: '1px solid',
					borderRadius: '5px',
					width: '100%',
					fontFamily: 'Arial',
					boxSizing: 'border-box',
					textAlign: 'center',
					marginBottom: '0.3rem',
				}}
				type="text"
				name="category"
				pattern="[A-Za-zА-ЯЁа-яё0-9\s\-\.\,\(\)]{1,20}"
				title={'Можно использовать A-z и А-я, символы: - , . ( )'}
				maxLength={20}
				value={category}
				onChange={(e) => setCategory(e.target.value)}
				placeholder={!!props.enru ? 'Category' : 'Категория'}
			></input>
			<input
				style={{
					padding: '3px',
					border: '1px solid',
					borderRadius: '5px',
					width: '100%',
					fontFamily: 'Arial',
					boxSizing: 'border-box',
					textAlign: 'center',
					marginBottom: '0.3rem',
				}}
				type="text"
				name="group"
				pattern="[A-Za-zА-ЯЁа-яё0-9\s\-\.\,\(\)]{1,20}"
				title={'Можно использовать A-z и А-я, символы: - , . ( )'}
				maxLength={20}
				value={group}
				onChange={(e) => setGroup(e.target.value)}
				placeholder={!!props.enru ? 'Group' : 'Группа'}
			></input>
			<UserDistanceModal
				startdist={addist1}
				enru={props.enru}
				dist={setAddist1}
				time={time1}
				setTime={setTime1}
			/>
		</form>
	)
}
