import { useState, useRef } from 'react'
import { API_site } from '../API_URL'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Menu,
	MenuItem,
	Tooltip,
	Snackbar,
} from '@mui/material'
import {
	BorderColor,
	Close,
	CompareArrowsRounded,
	EditNoteRounded,
} from '@mui/icons-material'
import ModalDialogTd from './ModalDialogTd'

//✔❗❌⚠⚙♻📲✈

export default function TdButtonSetup(props) {
	// const [setupButton, setSetupButton] = useState(false)

	const refForm = useRef(null)
	const hendlSubmit = () => {
		if (refForm.current) {
			refForm.current.requestSubmit()
		}
		setModal(false)
		hendlClose()
	}

	const [inputR, setInputR] = useState({ idr: '', idz: '' })

	const [isLoadingE, setIsLoadingE] = useState(false)
	const [isErrE, setIsErrE] = useState('')
	const [isLoadingQ, setIsLoadingQ] = useState(false)
	const [isErrQ, setIsErrQ] = useState('')
	const [isLoadingN, setIsLoadingN] = useState(false)
	const [isErrN, setIsErrN] = useState('')
	const [isLoadingD, setIsLoadingD] = useState(false)
	const [isErrD, setIsErrD] = useState('')

	const setUserEmpty = async (e) => {
		e.preventDefault()
		hendlClose()
		setIsLoadingE(true)
		setIsErrE('')
		try {
			const res = await fetch(API_site + '/setswim', {
				method: 'POST',
				body: JSON.stringify({
					id: props.web,
					idUser: props.item.id,
					TimeFinishEmpty: 1,
				}),
				headers: { 'Content-type': 'application/json' },
			})
			if (!res.ok) {
				alert(
					'Данные не были изменены! \nПроверьте соединение с интернетом и повторите редактирование! ',
				)
				if (!res.ok) {
					setIsErrE('⚠!')
					setTimeout(() => {
						setIsErrE('')
					}, 1970)
				}
				// throw new Error('Ошибка сети или сервера')
			}
			// const result = await res.json()
			// console.log(result)
			setIsErrE('✔')
			setTimeout(() => {
				setIsErrE('')
				hendlClose()
			}, 1000)
			setOpenSnackbar(true)
		} catch (error) {
			alert(
				'Данные не были изменены! \nПроверьте соединение с интернетом и повторите редактирование! ',
			)
			// console.log(error)
			setIsErrE('⚠!')
			setTimeout(() => {
				setIsErrE('')
			}, 1970)
		}
		setIsLoadingE(false)
	} //send setswim
	const setUserDSQ = async (e) => {
		e.preventDefault()
		hendlClose()
		setIsLoadingQ(true)
		setIsErrQ('')
		try {
			const res = await fetch(API_site + '/setswim', {
				method: 'POST',
				body: JSON.stringify({
					id: props.web,
					idUser: props.item.id,
					TimeFinishDSQ: 1,
				}),
				headers: { 'Content-type': 'application/json' },
			})
			if (!res.ok) {
				alert(
					'Данные не были изменены! \nПроверьте соединение с интернетом и повторите редактирование! ',
				)
				if (!res.ok) {
					setIsErrQ('⚠!')
					setTimeout(() => {
						setIsErrQ('')
					}, 1970)
				}
				// throw new Error('Ошибка сети или сервера')
			}
			// const result = await res.json()
			// console.log(result)
			setIsErrQ('✔')
			setTimeout(() => {
				setIsErrQ('')
				hendlClose()
			}, 1000)
			setOpenSnackbar(true)
		} catch (error) {
			alert(
				'Данные не были изменены! \nПроверьте соединение с интернетом и повторите редактирование! ',
			)
			// console.log(error)
			setIsErrQ('⚠!')
			setTimeout(() => {
				setIsErrQ('')
			}, 1970)
		}
		setIsLoadingQ(false)
	} //send setswim
	const setUserDNS = async (e) => {
		e.preventDefault()
		hendlClose()
		setIsLoadingN(true)
		setIsErrN('')
		try {
			const res = await fetch(API_site + '/setswim', {
				method: 'POST',
				body: JSON.stringify({
					id: props.web,
					idUser: props.item.id,
					TimeFinishDNQ: 1,
				}),
				headers: { 'Content-type': 'application/json' },
			})
			if (!res.ok) {
				alert(
					'Данные не были изменены! \nПроверьте соединение с интернетом и повторите редактирование! ',
				)
				if (!res.ok) {
					setIsErrN('⚠!')
					setTimeout(() => {
						setIsErrN('')
					}, 1970)
				}
				// throw new Error('Ошибка сети или сервера')
			}
			// const result = await res.json()
			// console.log(result)
			setIsErrN('✔')
			setTimeout(() => {
				setIsErrN('')
				hendlClose()
			}, 1000)
			setOpenSnackbar(true)
		} catch (error) {
			alert(
				'Данные не были изменены! \nПроверьте соединение с интернетом и повторите редактирование! ',
			)
			// console.log(error)
			setIsErrN('⚠!')
			setTimeout(() => {
				setIsErrN('')
			}, 1970)
		}
		setIsLoadingN(false)
	} //send setswim

	const handlChange = (e) => {
		e.preventDefault()
		const { name, value } = e.target
		setInputR((prev) => ({ ...prev, [name]: value }))
	}
	//input

	const submitPoz = async (e) => {
		e.preventDefault()
		if (inputR.idr !== '' && inputR.idz !== '') {
			try {
				const res = await fetch(API_site + '/setpoz', {
					method: 'POST',
					body: JSON.stringify({
						id: props.web,
						swimmer: props.item.id,
						setidr: inputR.idr,
						setidz: inputR.idz,
					}),
					headers: { 'Content-type': 'application/json' },
				})
				if (!res.ok) {
					// console.log('Ошибка сети или сервера!')
				}
				// const result = await res.json()
				// console.log(result)
				hendlClose()
				setOpenSnackbar(true)
			} catch (error) {
				// console.log(error)
			}
		}
	}

	const deleteUser = async (e) => {
		e.preventDefault()
		hendlClose()
		setDialog(false)
		setIsLoadingD(true)
		setIsErrD('')
		try {
			const res = await fetch(API_site + '/delswim', {
				method: 'POST',
				body: JSON.stringify({
					id: props.web,
					idUser: props.item.id,
				}),
				headers: { 'Content-type': 'application/json' },
			})

			if (!res.ok) {
				setIsErrD('⚠!')
				setTimeout(() => {
					setIsErrD('')
				}, 1970)
			}
			// throw new Error('Ошибка сети или сервера')

			// const result = await res.json()
			// console.log(result)
			setIsErrD('✔')
			setTimeout(() => {
				setIsErrD('')
				hendlClose()
			}, 1200)
			setOpenSnackbar(true)
		} catch (error) {
			// console.log(error)
			setIsErrD('⚠!')
			setTimeout(() => {
				setIsErrD('')
			}, 1970)
		}
		setIsLoadingD(false)
	} //send delswim

	const [anEL, setAnEL] = useState(null)
	const hendlOpen = (event) => {
		setAnEL(event.currentTarget)
	}
	const hendlClose = () => {
		setAnEL(null)
	}
	const [dialog, setDialog] = useState(false)
	const [modal, setModal] = useState(false)
	const [translate, setTranslate] = useState(false)

	const [openSnackbar, setOpenSnackbar] = useState(false)
	const closeSnackbar = () => {
		setOpenSnackbar(false)
	}

	return (
		<>
			<Snackbar
				open={openSnackbar}
				message="✔ Успешно! Дождитесь обновления!"
				autoHideDuration={1000}
				onClose={closeSnackbar}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				sx={{
					'& .MuiSnackbarContent-root': {
						display: 'block',
						boxShadow: 'none',
						color: 'white',
						backgroundColor: 'green',
						fontFamily: 'Arial',
						fontSize: '12px',
						textAlign: 'center',
					},
				}}
			/>
			<Tooltip arrow placement="top" title="Настройки участника">
				<IconButton onClick={hendlOpen}>
					<BorderColor style={{ fontSize: '1rem', color: 'black' }} />
				</IconButton>
			</Tooltip>
			<Menu
				anchorEl={anEL}
				open={Boolean(anEL)}
				onClose={hendlClose}
				disableAutoFocus
			>
				<MenuItem>
					<Tooltip arrow placement="left" title="Обнулить время">
						<Button
							onClick={setUserEmpty}
							style={{
								backgroundColor: 'white',
								padding: '1px',
								borderRadius: '30%',
								color: 'blue',
							}}
						>
							<span>00:00.00</span>
						</Button>
					</Tooltip>
				</MenuItem>
				<MenuItem>
					<Tooltip arrow placement="left" title="Дисквалификация">
						<Button
							onClick={setUserDSQ}
							style={{
								backgroundColor: 'white',
								padding: '1px',
								borderRadius: '3px',
								color: 'black',
							}}
						>
							DSQ
						</Button>
					</Tooltip>
				</MenuItem>
				<MenuItem>
					<Tooltip arrow placement="left" title="Неявка">
						<Button
							onClick={setUserDNS}
							style={{
								backgroundColor: 'white',
								padding: '1px',
								borderRadius: '3px',
								color: 'black',
							}}
						>
							DNS
						</Button>
					</Tooltip>
				</MenuItem>
				<MenuItem>
					<Tooltip arrow placement="left" title="Обновить дорожку и заплыв">
						<Button
							onClick={() => setTranslate(true)}
							style={{
								backgroundColor: 'white',
								borderRadius: '3px',
								color: 'green',
							}}
						>
							<CompareArrowsRounded />
						</Button>
					</Tooltip>
					<Dialog
						open={translate}
						onClose={() => {
							setTranslate(false)
							hendlClose()
						}}
						role="alertdialog"
						keepMounted
					>
						<DialogTitle sx={{ m: 0, p: 2 }}>Переместить</DialogTitle>
						<div style={{ textAlign: 'center' }}>
							<input
								name="idr"
								value={inputR.idr}
								onChange={handlChange}
								onBlur={submitPoz}
								min={0}
								max={9}
								title="Введите номер ДОРОЖКИ и заплыва куда переместить участника"
								type="number"
								placeholder="/⊥\"
								style={{
									fontSize: '1rem',
									padding: '1px',
									width: '5rem',
								}}
							/>
							<input
								name="idz"
								value={inputR.idz}
								onChange={handlChange}
								onBlur={submitPoz}
								min={1}
								max={99}
								type="number"
								title="Введите номер ЗАПЛЫВА и дорожки куда переместить участника"
								placeholder="№"
								style={{
									fontSize: '1rem',
									padding: '1px',
									width: '5rem',
								}}
							/>
						</div>
						<DialogActions>
							<Button
								onClick={() => {
									setTranslate(false)
									hendlClose()
								}}
							>
								OK
							</Button>
						</DialogActions>
					</Dialog>
				</MenuItem>

				<MenuItem>
					<Tooltip arrow placement="left" title="Редактировать данные">
						<Button
							onClick={() => setModal(true)}
							style={{
								backgroundColor: 'white',
								borderRadius: '3px',
							}}
						>
							<EditNoteRounded />
						</Button>
					</Tooltip>

					<Dialog
						open={modal}
						onClose={() => {
							setModal(false)
							hendlClose()
						}}
						role="alertdialog"
						keepMounted
					>
						<DialogTitle sx={{ m: 0, p: 2 }}>
							Редактировать участника
						</DialogTitle>
						<IconButton
							aria-label="close"
							onClick={() => {
								setModal(false)
								hendlClose()
							}}
							sx={{ position: 'absolute', right: 8, top: 8 }}
						>
							<Close />
						</IconButton>
						<DialogContent dividers>
							<ModalDialogTd
								item={props.item}
								enru={props.enru}
								refForm={refForm}
								web={props.web}
								data={props.data}
							/>
						</DialogContent>
						<DialogActions>
							<Button
								onClick={() => {
									setModal(false)
									hendlClose()
								}}
							>
								отмена
							</Button>
							<Button onClick={hendlSubmit} sx={{ color: 'darkgreen' }}>
								сохранить
							</Button>
						</DialogActions>
					</Dialog>
				</MenuItem>

				<MenuItem>
					<Tooltip arrow placement="left" title="Удалить участника">
						<Button
							onClick={() => setDialog(true)}
							style={{
								fontSize: '0.5rem',
								backgroundColor: 'white',
								borderRadius: '3px',
							}}
						>
							{!isErrD ? (!isLoadingD ? '❌' : '=✈') : `${isErrD}`}
						</Button>
					</Tooltip>
					<Dialog
						open={dialog}
						onClose={() => setDialog(false)}
						role="alertdialog"
						keepMounted
					>
						<DialogContent>
							<DialogTitle>
								Вы уверены что хотите удалить {props.item.lastname} ?
							</DialogTitle>
						</DialogContent>
						<DialogActions>
							<Button onClick={() => setDialog(false)}>отмена</Button>
							<Button onClick={deleteUser} sx={{ color: 'red' }}>
								удалить
							</Button>
						</DialogActions>
					</Dialog>
				</MenuItem>
			</Menu>
		</>
	)
}
