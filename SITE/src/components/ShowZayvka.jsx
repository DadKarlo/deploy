import { useEffect, useRef, useState } from 'react'
import { API_site } from '../API_URL'
import { DataGrid } from '@mui/x-data-grid'
import { ruRU } from '@mui/x-data-grid/locales'
import {
	Alert,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
} from '@mui/material'
import ModalDialogTd from './ModalDialogTd'
import { BorderColor, Close, Edit } from '@mui/icons-material'

const colums = [
	{ field: 'lastname', headerName: 'ФИО', width: 200 },
	{ field: 'birthday', headerName: 'Дата рождения', width: 100 },
	{ field: 'team', headerName: 'Команда', width: 100 },
	{ field: 'sex', headerName: 'Пол', width: 100 },
	{ field: 'distance', headerName: 'Дистанция', width: 100 },
	{ field: 'category', headerName: 'Категория', width: 100 },
	{ field: 'group', headerName: 'Группа', width: 70 },
	{ field: 'TimeStart', headerName: 'Заявочное время', width: 100 },
	{ field: 'TimeFinish', headerName: 'Результат', width: 100 },
	{
		field: 'Edit',
		headerName: <BorderColor fontSize="small" />,
		width: 30,
		renderCell: (params) => <Edit fontSize="small" />,
		sortable: false,
	},
]

export default function ShowZayvka(props) {
	// const distanceEN = [
	// 	'25 m Freestyle',
	// 	'50 m Freestyle',
	// 	'100 m Freestyle',
	// 	'200 m Freestyle',
	// 	'400 m Freestyle',
	// 	'800 m Freestyle',
	// 	'1500 m Freestyle',
	// 	'25 m Backstroke',
	// 	'50 m Backstroke',
	// 	'100 m Backstroke',
	// 	'200 m Backstroke',
	// 	'25 m Breaststroke',
	// 	'50 m Breaststroke',
	// 	'100 m Breaststroke',
	// 	'200 m Breaststroke',
	// 	'25 m Butterfly',
	// 	'50 m Butterfly',
	// 	'100 m Butterfly',
	// 	'200 m Butterfly',
	// 	'100 m Individual Medley',
	// 	'200 m Individual Medley',
	// 	'400 m Individual Medley',
	// 	'3 km',
	// 	'5 km',
	// 	'10 km',
	// ] //distance
	const distanceRU = [
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

	// const handlChange = (id, field, value) => {
	// 	setDataUser((prevItem) =>
	// 		prevItem.map((item) =>
	// 			item.id === id ? { ...item, [field]: value } : item,
	// 		),
	// 	)
	// } // №1

	const handlChange = (newRow) => {
		setDataUser((prevRows) =>
			prevRows.map((row) => (row.id === newRow.id ? newRow : row)),
		)
		return newRow
	} //  №2

	const handlDelete = (id) => {
		setDataUser((prev) => prev.filter((row) => row.id !== id))
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
						sex: dataUser[swimID].sex || ' ',
						group: dataUser[swimID].group,
						category: dataUser[swimID].category,
						addistOther: dataUser[swimID].distance || '25 м вольный стиль',
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
			// const swimID = dataUser.findIndex((swimm) => swimm.id === r)
			handlDelete(r)
		} catch (error) {
			// console.log(error)
			setIsErrD((prev) => ({ ...prev, [r]: '⚠!' }))
			setTimeout(() => {
				setIsErrD((prev) => ({ ...prev, [r]: '' }))
			}, 1970)
		}
		setIsLoadingD((prev) => ({ ...prev, [r]: false }))
	} //send zayvka

	const deleteUser = async (e) => {
		e.preventDefault()
		setDialog(false)
		modalSwimmerClose()
		try {
			const res = await fetch(API_site + '/delswim', {
				method: 'POST',
				body: JSON.stringify({
					id: props.web,
					idUser: modalRow.id,
				}),
				headers: { 'Content-type': 'application/json' },
			})

			if (!res.ok) {
				alert(
					'Данные не были удалены! \nПроверьте соединение с интернетом и повторите попытку! ',
				)
			}
			// throw new Error('Ошибка сети или сервера')

			// const result = await res.json()
			// console.log(result)
		} catch (error) {
			// console.log(error)
			alert(
				'Данные не были удалены! \nПроверьте соединение с интернетом и повторите попытку! ',
			)
		}
	} //send delswim

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
	} //update form

	const [widthZayvka, setWidthZayvka] = useState({
		lastname: 200,
		birthday: 100,
		team: 100,
		sex: 100,
		distance: 150,
		category: 100,
		group: 100,
		play: 100,
	})
	const changeWidthZayvka = (params) => {
		setWidthZayvka((prev) => ({
			...prev,
			[params.colDef.field]: params.width,
		}))
	}

	const columsZayvka = [
		{
			field: 'lastname',
			headerName: 'ФИО',
			width: widthZayvka.lastname,
			editable: true,
		},
		{
			field: 'birthday',
			headerName: 'Дата рождения',
			width: widthZayvka.birthday,
			editable: true,
		},
		{
			field: 'team',
			headerName: 'Команда',
			width: widthZayvka.team,
			editable: true,
		},
		{
			field: 'sex',
			headerName: 'Пол',
			width: widthZayvka.sex,
			editable: true,
			type: 'singleSelect',
			valueOptions: ['Мужчины', 'Женщины', 'Девушки', 'Юноши', 'Другое'],
			renderCell: (params) => {
				if (params.value === null || params.value === '') {
					return 'Другое'
				}
				return params.value
			},
		},
		{
			field: 'distance',
			headerName: 'Дистанция',
			width: widthZayvka.distance,
			editable: true,
			type: 'singleSelect',
			valueOptions: distanceRU,
			renderCell: (params) => {
				if (params.value === null || params.value === '') {
					return '25 м вольный стиль'
				}
				return params.value
			},
		},
		{
			field: 'category',
			headerName: 'Категория',
			width: widthZayvka.category,
			editable: true,
		},
		{
			field: 'group',
			headerName: 'Группа',
			width: widthZayvka.group,
			editable: true,
		},
		{
			field: 'play',
			headerName: 'Действия',
			width: widthZayvka.play,
			renderCell: (params) => (
				<div>
					<Button
						onClick={(e) => AddZayvka(params.row.id, e)}
						sx={{
							margin: '3px',
							padding: 0,
							width: 30,
							minWidth: 'unset',
							border: '1px solid darkgreen',
							borderRadius: '5px',
						}}
					>
						{!isErrA[params.row.id]
							? !isLoadingA[params.row.id]
								? '✔️'
								: '=✈'
							: `${isErrA[params.row.id]}`}
					</Button>
					<Button
						onClick={(e) => deleteZayvka(params.row.id, e)}
						sx={{
							margin: '3px',
							padding: 0,
							width: 30,
							minWidth: 'unset',
							border: '1px solid darkred',
							borderRadius: '5px',
						}}
					>
						{!isErrD[params.row.id]
							? !isLoadingD[params.row.id]
								? '❌'
								: '=✈'
							: `${isErrD[params.row.id]}`}
					</Button>
				</div>
			),
		},
	]

	const refForm = useRef(null)
	const hendlSubmit = () => {
		if (refForm.current) {
			refForm.current.requestSubmit()
		}
		modalSwimmerClose()
	}

	const [dialog, setDialog] = useState(false)
	const [dialogUpdate, setDialogUpdate] = useState(false)
	const [modal, setModal] = useState(false)
	const [modalRow, setModalRow] = useState()
	const modalSwimmerOpen = (params) => {
		setModal(true)
		setModalRow(params.row)
	}
	const modalSwimmerClose = (row) => {
		setModal(false)
		setModalRow(null)
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
					onClick={() => setDialogUpdate(true)}
					title={
						!!props.enru
							? '++'
							: 'Для удаления старой (блокировка формы) и создания новой ссылки.'
					}
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
			<Dialog
				open={dialogUpdate}
				onClose={() => setDialogUpdate(false)}
				role="alertdialog"
				keepMounted
			>
				<DialogContent>
					<DialogTitle>
						Обновление ссылки для регистрации, заблокирует доступ к созданной
						ранее форме, и создаст новую. Используйте эту функцию после
						завершения дедлайна. Платформа перезагрузится.
					</DialogTitle>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setDialogUpdate(false)}>отмена</Button>
					<Button onClick={sendForm} sx={{ color: 'green' }}>
						обновить
					</Button>
				</DialogActions>
			</Dialog>
			<Button
				onClick={() => setshowUser((i) => !i)}
				style={{
					marginTop: '0.3rem',
					border: '1px solid',
					fontSize: '1rem',
					borderRadius: '5px',
					width: '50%',
					color: 'black',
					height: '1.5rem',
					fontFamily: 'Arial',
					backgroundColor: 'white',
					textAlign: 'center',
					cursor: 'pointer',
				}}
			>
				{showUser ? <>Открыть</> : <>Скрыть</>}
			</Button>
			{showUser ? (
				<h5 style={{ margin: '0.8rem' }}>
					У вас новых участников: {dataUser?.length}
				</h5>
			) : (
				data && (
					<>
						<Alert
							variant="outlined"
							severity="info"
							color="gray"
							sx={{
								mx: { xs: '0rem', sm: '3rem', md: '10rem' },
								fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.875rem' },
							}}
						>
							Вы можете редактировать данные. Добавляя участника (✔) пройдет
							автоматическое перераспределение.
						</Alert>
						<DataGrid
							sx={{
								mx: { xs: '0rem', sm: '3rem', md: '10rem' },
								border: '1px solid #121212',
								borderRadius: '20px',
								'.MuiDataGrid-columnHeaderTitle': {
									fontFamily: 'Arial',
									fontSize: '15px',
									fontWeight: 'bold',
								},
								'.MuiDataGrid-cell': { borderBottom: '1px solid #121212' },
								'.MuiDataGrid-columnHeaders': {
									borderBottom: '2px solid #121212',
									borderTop: '2px solid #121212',
								},
							}}
							slotProps={{
								toolbar: {
									csvOptions: {
										utf8WithBom: true,
										fields: [
											'lastname',
											'birthday',
											'team',
											'sex',
											'distance',
											'category',
											'group',
										],
									},
								},
							}}
							rows={dataUser}
							columns={columsZayvka}
							onColumnResize={changeWidthZayvka}
							processRowUpdate={handlChange}
							editMode="cell"
							showToolbar
							autoHeight
							disableRowSelectionOnClick
							disableColumnFilter
							disableDensitySelector //???
							hideFooter
							localeText={{
								...ruRU.components.MuiDataGrid.defaultProps.localeText,
								noRowsLabel: 'Участников для регистрации нет.',
							}}
						/>
					</>
				)
			)}
			<hr style={{ margin: '1rem 8%' }} />
			<h2 style={{ fontFamily: 'system-ui' }}>Спортсмены-участники</h2>
			<br />
			<Alert
				variant="outlined"
				severity="info"
				color="gray"
				sx={{
					mx: { xs: '0rem', sm: '3rem', md: '10rem' },
					fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.875rem' },
				}}
			>
				Внесения изменений ниже не влияют на автоматическое перераспределение
			</Alert>
			<br />
			<DataGrid
				sx={{
					mx: { xs: '0rem', sm: '3rem', md: '10rem' },
					border: '1px solid #121212',
					borderRadius: '20px',
					'.MuiDataGrid-columnHeaderTitle': {
						fontFamily: 'Arial',
						fontSize: '15px',
						fontWeight: 'bold',
					},
					'.MuiDataGrid-cell': { borderBottom: '1px solid #121212' },
					'.MuiDataGrid-columnHeaders': {
						borderBottom: '2px solid #121212',
						borderTop: '2px solid #121212',
					},
				}}
				slotProps={{
					toolbar: {
						csvOptions: {
							utf8WithBom: true,
							fields: [
								'lastname',
								'birthday',
								'team',
								'sex',
								'distance',
								'category',
								'group',
								'TimeStart',
								'TimeFinish',
							],
						},
					},
				}}
				rows={props.data?.sportsmens}
				columns={colums}
				showToolbar
				disableColumnFilter
				disableColumnSelector
				disableDensitySelector //???
				autoHeight
				disableColumnMenu
				disableRowSelectionOnClick
				onRowClick={modalSwimmerOpen}
				hideFooter
				localeText={{
					...ruRU.components.MuiDataGrid.defaultProps.localeText,
					noRowsLabel: 'Участников нет.',
				}}
			/>
			<Dialog
				open={modal}
				onClose={modalSwimmerClose}
				role="alertdialog"
				keepMounted
			>
				<DialogTitle sx={{ m: 0, p: 2 }}>Редактировать участника</DialogTitle>
				<IconButton
					aria-label="close"
					onClick={modalSwimmerClose}
					sx={{ position: 'absolute', right: 8, top: 8 }}
				>
					<Close />
				</IconButton>
				<DialogContent dividers>
					{modalRow && (
						<ModalDialogTd
							item={modalRow}
							enru={props.enru}
							refForm={refForm}
							web={props.web}
						/>
					)}
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => setDialog(true)}
						sx={{ color: 'red', mr: 'auto' }}
					>
						удалить
					</Button>
					<Button onClick={modalSwimmerClose}>отмена</Button>
					<Button onClick={hendlSubmit} sx={{ color: 'darkgreen' }}>
						сохранить
					</Button>
				</DialogActions>
			</Dialog>
			<Dialog
				open={dialog}
				onClose={() => setDialog(false)}
				role="alertdialog"
				keepMounted
			>
				<DialogContent>
					<DialogTitle>Вы уверены?</DialogTitle>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setDialog(false)}>отмена</Button>
					<Button onClick={deleteUser} sx={{ color: 'red' }}>
						удалить
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}
