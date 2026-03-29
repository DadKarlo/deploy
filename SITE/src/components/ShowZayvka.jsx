import { useEffect, useState } from 'react'
import { API_site } from '../API_URL'

export default function ShowZayvka(props) {
	const distanceEN = [
		'Distance...',
		'25 m Freestyle',
		'50 m Freestyle',
		'100 m Freestyle',
		'200 m Freestyle',
		'400 m Freestyle',
		'800 m Freestyle',
		'1500 m Freestyle',
		'25 m Backstroke',
		'50 m Backstroke',
		'100 m Backstroke',
		'200 m Backstroke',
		'25 m Breaststroke',
		'50 m Breaststroke',
		'100 m Breaststroke',
		'200 m Breaststroke',
		'25 m Butterfly',
		'50 m Butterfly',
		'100 m Butterfly',
		'200 m Butterfly',
		'100 m Individual Medley',
		'200 m Individual Medley',
		'400 m Individual Medley',
		'3 km',
		'5 km',
		'10 km',
	] //distance
	const distanceRU = [
		'Дистанция...',
		'25 м вольный стиль',
		'50 м вольный стиль',
		'100 м вольный стиль',
		'200 м вольный стиль',
		'400 м вольный стиль',
		'800 м вольный стиль',
		'1500 м вольный стиль',
		'25 м на спине',
		'50 м на спине',
		'100 м на спине',
		'200 м на спине',
		'25 м брасс',
		'50 м брасс',
		'100 м брасс',
		'200 м брасс',
		'25 м баттерфляй',
		'50 м баттерфляй',
		'100 м баттерфляй',
		'200 м баттерфляй',
		'100 м комплекс',
		'200 м комплекс',
		'400 м комплекс',
		'3 км',
		'5 км',
		'10 км',
	] //distance

	const [data, setData] = useState(null)
	const [dataUser, setDataUser] = useState([])
	const [showUser, setshowUser] = useState(true)

	useEffect(() => {
		setData(JSON.parse(props.www))
		setDataUser(JSON.parse(props.www)?.zayvka)
	}, [props.www])

	const handlChange = (id, field, value) => {
		setDataUser((prevItem) =>
			prevItem.map((item) =>
				item.id === id ? { ...item, [field]: value } : item,
			),
		)
	}

	const [isLoadingA, setIsLoadingA] = useState({})
	const [isErrA, setIsErrA] = useState({})

	const AddZayvka = async (r, e) => {
		e.preventDefault()
		setIsLoadingA((prev) => ({ ...prev, [r]: true }))
		setIsErrA((prev) => ({ ...prev, [r]: '' }))
		const swimID = dataUser.findIndex((swimm) => swimm.id === r)
		if (swimID !== -1) {
			try {
				const res = await fetch(API_site + '/usesport', {
					method: 'POST',
					body: JSON.stringify({
						id: props.web,
						firstname: dataUser[swimID].firstname,
						lastname: dataUser[swimID].lastname,
						birthday: dataUser[swimID].birthday,
						team: dataUser[swimID].team,
						sex: dataUser[swimID].sex,
						group: dataUser[swimID].group,
						category: dataUser[swimID].category,
						addistOther: dataUser[swimID].distance,
						timeOther: dataUser[swimID].TimeStart,
						addist1: '',
						addist2: '',
						addist3: '',
					}),
					headers: { 'Content-type': 'application/json' },
				})

				if (!res.ok) {
					setIsErrA((prev) => ({ ...prev, [r]: '⚠!' }))
					setTimeout(() => {
						setIsErrA((prev) => ({ ...prev, [r]: '' }))
					}, 1970)
				}

				await res.json()
				setIsErrA((prev) => ({ ...prev, [r]: '✔' }))
				setTimeout(() => {
					setIsErrA((prev) => ({ ...prev, [r]: '' }))
				}, 1970)
				deleteZayvka(r, e)
			} catch (error) {
				setIsErrA((prev) => ({ ...prev, [r]: '⚠!' }))
				setTimeout(() => {
					setIsErrA((prev) => ({ ...prev, [r]: '' }))
				}, 1970)
			}
		}
		setIsLoadingA((prev) => ({ ...prev, [r]: false }))
	} //add zayvka

	const [isLoadingD, setIsLoadingD] = useState({})
	const [isErrD, setIsErrD] = useState({})
	//
	const deleteZayvka = async (r, e) => {
		e.preventDefault()
		setIsLoadingD((prev) => ({ ...prev, [r]: true }))
		setIsErrD((prev) => ({ ...prev, [r]: '' }))
		try {
			const res = await fetch(API_site + '/delzayv', {
				method: 'POST',
				body: JSON.stringify({
					id: props.web,
					idUser: r,
				}),
				headers: { 'Content-type': 'application/json' },
			})

			if (!res.ok) {
				setIsErrD((prev) => ({ ...prev, [r]: '⚠!' }))
				setTimeout(() => {
					setIsErrD((prev) => ({ ...prev, [r]: '' }))
				}, 1970)
				// throw new Error('Ошибка сети или сервера')
			}

			// const result = await res.json()
			await res.json()
			// console.log(result)
			setIsErrD((prev) => ({ ...prev, [r]: '✔' }))
			setTimeout(() => {
				setIsErrD((prev) => ({ ...prev, [r]: '' }))
			}, 1970)
			const swimID = dataUser.findIndex((swimm) => swimm.id === r)
			if (swimID !== -1) {
				dataUser.splice(swimID, 1)
			}
		} catch (error) {
			// console.log(error)
			setIsErrD((prev) => ({ ...prev, [r]: '⚠!' }))
			setTimeout(() => {
				setIsErrD((prev) => ({ ...prev, [r]: '' }))
			}, 1970)
		}
		setIsLoadingD((prev) => ({ ...prev, [r]: false }))
	} //send zayvka

	const sendForm = async (e) => {
		e.preventDefault()
		try {
			const res = await fetch(API_site + '/formclik', {
				method: 'POST',
				body: JSON.stringify({
					id: data?.setup?.URLCLIENT,
				}),
				headers: { 'Content-type': 'application/json' },
			})
			if (!res.ok) {
				throw new Error('Ошибка сети или сервера')
			}
			await res.json()
		} catch (error) {}
		window.location.reload()
	}

	return (
		<div style={{ marginBottom: '0.3rem' }}>
			<h6>
				{!!props.enru ? 'Form registration: ' : 'Форма регистрации: '}
				<a
					href={
						window.location.origin +
						'/' +
						data?.setup?.URLCLIENT +
						'/' +
						data?.FormURL
					}
				>
					{window.location.origin +
						'/' +
						data?.setup?.URLCLIENT +
						'/' +
						data?.FormURL}
				</a>
				<button
					onClick={sendForm}
					style={{
						border: '1px solid',
						padding: '0px 3px',
						borderRadius: '5px',
						fontFamily: 'Arial',
						backgroundColor: 'white',
						margin: '3px',
						cursor: 'pointer',
					}}
				>
					{!!props.enru ? 'update' : 'обновить'}
				</button>
			</h6>
			{/* <h6 style={{ fontSize: '0.55rem' }}>
				{!!props.enru
					? '++'
					: 'Обновите для удаления старой (блокировка формы) и создания новой ссылки.'}
			</h6> */}
			<button
				onClick={() => setshowUser((i) => !i)}
				style={{
					marginTop: '0.3rem',
					border: '1px solid',
					fontSize: '1rem',
					borderRadius: '5px',
					width: '50%',
					fontFamily: 'Arial',
					backgroundColor: 'white',
					textAlign: 'center',
					cursor: 'pointer',
				}}
			>
				{showUser ? <>Открыть</> : <>Скрыть</>}
			</button>
			{showUser ? (
				<h5>У вас новых участников: {dataUser?.length}</h5>
			) : (
				data && (
					<div
						style={{
							margin: 'auto',
							maxWidth: '700px',
							transform: 'scale(0.9)',
							justifyContent: 'center',
						}}
					>
						<div>
							{/*  */}
							<button
								style={{
									padding: '1px',
									border: '1px solid',
									borderRadius: '5px',
									backgroundColor: 'white',
									whiteSpace: 'pre',
									margin: '1px',
								}}
								onClick={() =>
									setDataUser([
										...dataUser.sort((a, d) =>
											d.lastname.localeCompare(a.lastname, ['ru', 'en'], {
												numeric: true,
												sensitivity: 'base',
												ignorePunctuation: true,
											}),
										),
									])
								}
							>
								{!!props.enru ? `Nane ⬇ ` : 'ФИО ⬇ '}
							</button>
							<button
								style={{
									padding: '1px',
									border: '1px solid',
									borderRadius: '5px',
									backgroundColor: 'white',
									whiteSpace: 'pre',
								}}
								onClick={() =>
									setDataUser([
										...dataUser.sort((a, d) =>
											a.lastname.localeCompare(d.lastname, ['ru', 'en'], {
												numeric: true,
												sensitivity: 'base',
												ignorePunctuation: true,
											}),
										),
									])
								}
							>
								{!!props.enru ? ` ⬆ ` : ' ⬆ '}
							</button>
							{/*  */}
							<button
								style={{
									padding: '1px',
									border: '1px solid',
									borderRadius: '5px',
									backgroundColor: 'white',
									whiteSpace: 'pre',
									margin: '1px',
									marginLeft: '0.3rem',
								}}
								onClick={() =>
									setDataUser([
										...dataUser.sort((a, d) =>
											d.birthday.localeCompare(a.birthday, ['ru', 'en'], {
												numeric: true,
												sensitivity: 'base',
												ignorePunctuation: true,
											}),
										),
									])
								}
							>
								{!!props.enru ? `Date ⬇ ` : 'Дата ⬇ '}
							</button>
							<button
								style={{
									padding: '1px',
									border: '1px solid',
									borderRadius: '5px',
									backgroundColor: 'white',
									whiteSpace: 'pre',
								}}
								onClick={() =>
									setDataUser([
										...dataUser.sort((a, d) =>
											a.birthday.localeCompare(d.birthday, ['ru', 'en'], {
												numeric: true,
												sensitivity: 'base',
												ignorePunctuation: true,
											}),
										),
									])
								}
							>
								{!!props.enru ? ` ⬆ ` : ' ⬆ '}
							</button>
							{/*  */}
							<button
								style={{
									padding: '1px',
									border: '1px solid',
									borderRadius: '5px',
									backgroundColor: 'white',
									whiteSpace: 'pre',
									margin: '1px',
									marginLeft: '0.3rem',
								}}
								onClick={() =>
									setDataUser([
										...dataUser.sort((a, d) =>
											d.team.localeCompare(a.team, ['ru', 'en'], {
												numeric: true,
												sensitivity: 'base',
												ignorePunctuation: true,
											}),
										),
									])
								}
							>
								{!!props.enru ? `Team ⬇ ` : 'Команда ⬇ '}
							</button>
							<button
								style={{
									padding: '1px',
									border: '1px solid',
									borderRadius: '5px',
									backgroundColor: 'white',
									whiteSpace: 'pre',
								}}
								onClick={() =>
									setDataUser([
										...dataUser.sort((a, d) =>
											a.team.localeCompare(d.team, ['ru', 'en'], {
												numeric: true,
												sensitivity: 'base',
												ignorePunctuation: true,
											}),
										),
									])
								}
							>
								{!!props.enru ? ` ⬆ ` : ' ⬆ '}
							</button>
							{/*  */}
							<button
								style={{
									padding: '1px',
									border: '1px solid',
									borderRadius: '5px',
									backgroundColor: 'white',
									whiteSpace: 'pre',
									margin: '1px',
									marginLeft: '0.3rem',
								}}
								onClick={() =>
									setDataUser([
										...dataUser.sort((a, d) =>
											d.sex.localeCompare(a.sex, ['ru', 'en'], {
												numeric: true,
												sensitivity: 'base',
												ignorePunctuation: true,
											}),
										),
									])
								}
							>
								{!!props.enru ? `Sex ⬇ ` : 'Пол ⬇ '}
							</button>
							<button
								style={{
									padding: '1px',
									border: '1px solid',
									borderRadius: '5px',
									backgroundColor: 'white',
									whiteSpace: 'pre',
								}}
								onClick={() =>
									setDataUser([
										...dataUser.sort((a, d) =>
											a.sex.localeCompare(d.sex, ['ru', 'en'], {
												numeric: true,
												sensitivity: 'base',
												ignorePunctuation: true,
											}),
										),
									])
								}
							>
								{!!props.enru ? ` ⬆ ` : ' ⬆ '}
							</button>
							{/*  */}
							<button
								style={{
									padding: '1px',
									border: '1px solid',
									borderRadius: '5px',
									backgroundColor: 'white',
									whiteSpace: 'pre',
									margin: '1px',
									marginLeft: '0.3rem',
								}}
								onClick={() =>
									setDataUser([
										...dataUser.sort((a, d) =>
											d.distance.localeCompare(a.distance, ['ru', 'en'], {
												numeric: true,
												sensitivity: 'base',
												ignorePunctuation: true,
											}),
										),
									])
								}
							>
								{!!props.enru ? `Distance ⬇ ` : 'Дистанция ⬇ '}
							</button>
							<button
								style={{
									padding: '1px',
									border: '1px solid',
									borderRadius: '5px',
									backgroundColor: 'white',
									whiteSpace: 'pre',
								}}
								onClick={() =>
									setDataUser([
										...dataUser.sort((a, d) =>
											a.distance.localeCompare(d.distance, ['ru', 'en'], {
												numeric: true,
												sensitivity: 'base',
												ignorePunctuation: true,
											}),
										),
									])
								}
							>
								{!!props.enru ? ` ⬆ ` : ' ⬆ '}
							</button>
							{/*  */}
						</div>
						<ol
							style={{
								width: '100%',
								justifyContent: 'center',
								border: '1px solid',
								borderRadius: '5px',
							}}
						>
							{dataUser.map((item) => (
								<li
									key={item.id}
									style={{
										margin: '0.8rem',
										marginLeft: '1.5rem',
									}}
								>
									<div>
										<input
											style={{
												padding: '3px',
												border: '1px solid',
												borderRadius: '5px',
												width: '25%',
												fontFamily: 'Arial',
												boxSizing: 'border-box',
												textAlign: 'center',
											}}
											type="text"
											name="lastname"
											pattern="[A-Za-zА-ЯЁа-яё\s]{1,50}"
											title={'Можно использовать A-z и А-я'}
											maxLength={50}
											value={item.lastname}
											placeholder={!!props.enru ? 'Name' : 'ФИО участника'}
											required
											onChange={(e) =>
												handlChange(item.id, 'lastname', e.target.value)
											}
										></input>
										<input
											style={{
												padding: '3px',
												border: '1px solid',
												borderRadius: '5px',
												width: '25%',
												fontFamily: 'Arial',
												boxSizing: 'border-box',
												textAlign: 'center',
											}}
											type="text"
											name="birthday"
											maxLength={20}
											value={item.birthday}
											placeholder={!!props.enru ? 'Birthday' : 'Дата рождения'}
											onChange={(e) =>
												handlChange(item.id, 'birthday', e.target.value)
											}
										></input>
										<input
											style={{
												padding: '3px',
												border: '1px solid',
												borderRadius: '5px',
												width: '25%',
												fontFamily: 'Arial',
												boxSizing: 'border-box',
												textAlign: 'center',
											}}
											type="text"
											name="team"
											pattern="[A-Za-zА-ЯЁа-яё0-9\s\-\.\,\(\)]{1,20}"
											title={'Можно использовать A-z и А-я, символы: - , . ( )'}
											maxLength={20}
											value={item.team}
											placeholder={!!props.enru ? 'Team' : 'Командa'}
											onChange={(e) =>
												handlChange(item.id, 'team', e.target.value)
											}
										></input>
										<button
											onClick={(e) => AddZayvka(item.id, e)}
											style={{
												width: '7%',
												padding: '3px',
												border: '1px solid',
												borderRadius: '5px',
											}}
										>
											{!isErrA[item.id]
												? !isLoadingA[item.id]
													? '✔️'
													: '=✈'
												: `${isErrA[item.id]}`}
										</button>
										<button
											onClick={(e) => deleteZayvka(item.id, e)}
											style={{
												width: '7%',
												padding: '3px',
												border: '1px solid',
												borderRadius: '5px',
											}}
										>
											{!isErrD[item.id]
												? !isLoadingD[item.id]
													? '❌'
													: '=✈'
												: `${isErrD[item.id]}`}
										</button>
									</div>
									<div>
										<select
											style={{
												padding: '3px',
												border: '1px solid',
												borderRadius: '5px',
												width: '25%',
												fontFamily: 'Arial',
												boxSizing: 'border-box',
												textAlign: 'center',
											}}
											value={item.sex}
											onChange={(e) =>
												handlChange(item.id, 'sex', e.target.value)
											}
										>
											<option value={!!props.enru ? `Men` : 'Мужчины'}>
												{!!props.enru ? `Men` : 'Мужчины'}
											</option>
											<option value={!!props.enru ? `Women` : 'Женщины'}>
												{!!props.enru ? `Women` : 'Женщины'}
											</option>
											<option value={!!props.enru ? `Girls` : 'Девочки'}>
												{!!props.enru ? `Girls` : 'Девочки'}
											</option>
											<option value={!!props.enru ? `Boys` : 'Мальчики'}>
												{!!props.enru ? `Boys` : 'Мальчики'}
											</option>
											<option value={!!props.enru ? `Other` : 'Другое'}>
												{!!props.enru ? `Other` : 'Другое'}
											</option>
										</select>
										<select
											style={{
												padding: '3px',
												border: '1px solid',
												borderRadius: '5px',
												width: '25%',
												fontFamily: 'Arial',
												textAlign: 'center',
												appearance: 'none',
											}}
											value={item.distance}
											onChange={(e) =>
												handlChange(item.id, 'distance', e.target.value)
											}
										>
											{!!props.enru
												? distanceEN.map((use) => (
														<option key={use.valueOf()} value={use.valueOf()}>
															{use.valueOf()}
														</option>
													))
												: distanceRU.map((use) => (
														<option key={use.valueOf()} value={use.valueOf()}>
															{use.valueOf()}
														</option>
													))}
										</select>
										<input
											style={{
												padding: '3px',
												border: '1px solid',
												borderRadius: '5px',
												width: '25%',
												fontFamily: 'Arial',
												boxSizing: 'border-box',
												textAlign: 'center',
											}}
											type="text"
											name="category"
											pattern="[A-Za-zА-ЯЁа-яё0-9\s\-\.\,\(\)]{1,20}"
											title={'Можно использовать A-z и А-я, символы: - , . ( )'}
											maxLength={20}
											value={item.category}
											onChange={(e) =>
												handlChange(item.id, 'category', e.target.value)
											}
											placeholder={!!props.enru ? 'Category' : 'Категория'}
										></input>
										<input
											style={{
												padding: '3px',
												border: '1px solid',
												borderRadius: '5px',
												width: '25%',
												fontFamily: 'Arial',
												boxSizing: 'border-box',
												textAlign: 'center',
											}}
											type="text"
											name="group"
											pattern="[A-Za-zА-ЯЁа-яё0-9\s\-\.\,\(\)]{1,20}"
											title={'Можно использовать A-z и А-я, символы: - , . ( )'}
											maxLength={20}
											value={item.group}
											onChange={(e) =>
												handlChange(item.id, 'group', e.target.value)
											}
											placeholder={!!props.enru ? 'Group' : 'Группа'}
										></input>
									</div>
								</li>
							))}
						</ol>
					</div>
				)
			)}
		</div>
	)
}

// {
// 	"id": "dimon82-466dad",
// 	"lastname": "'Дмитрий Щербаков'",
// 	"birthday": "'08.04.1996'",
// 	"team": "Одинцово",
// 	"sex": "Мужчины",
// 	"distance": "200 м комплекс",
// 	"TimeStart": "001503",
// 	"group": "",
// 	"category": ""
// }

// <button onClick={() => setData([...data.sort((a, d) => a.id - d.id)])}>
// 				idUP
// 			</button>
// 			<button onClick={() => setData([...data.sort((a, d) => d.id - a.id)])}>
// 				idDOWN
// 			</button>
// 			<button
// 				onClick={() =>
// 					setData([
// 						...data.sort((a, d) =>
// 							a.name.localeCompare(d.name, ['ru', 'en'], {
// 								numeric: true,
// 								sensitivity: 'base',
// 								ignorePunctuation: true,
// 							}),
// 						),
// 					])
// 				}
// 			>
// 				nameUP
// 			</button>
// <button
// 	onClick={() =>
// 		setData([
// 			...data.sort((a, d) =>
// 				d.name.localeCompare(a.name, ['ru', 'en'], {
// 					numeric: true,
// 					sensitivity: 'base',
// 					ignorePunctuation: true,
// 				}),
// 			),
// 		])
// 	}
// >
// 	nameDOWN
// </button>
// 			<button
// 				onClick={() =>
// 					setData([
// 						...data.sort((a, d) =>
// 							a.age.localeCompare(d.age, ['ru', 'en'], {
// 								numeric: true,
// 								sensitivity: 'base',
// 								ignorePunctuation: true,
// 							}),
// 						),
// 					])
// 				}
// 			>
// 				ageUP
// 			</button>
// 			<button
// 				onClick={() =>
// 					setData([
// 						...data.sort((a, d) =>
// 							d.age.localeCompare(a.age, ['ru', 'en'], {
// 								numeric: true,
// 								sensitivity: 'base',
// 								ignorePunctuation: true,
// 							}),
// 						),
// 					])
// 				}
// 			>
// 				ageDOWN
// 			</button>
