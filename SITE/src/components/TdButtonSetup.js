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
} from '@mui/material'
import { BorderColor, Close } from '@mui/icons-material'
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
		} catch (error) {
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
		} catch (error) {
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
		} catch (error) {
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
			} catch (error) {
				// console.log(error)
			}
		}
	}

	const deleteUser = async (e) => {
		e.preventDefault()
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

	return (
		<>
			<Tooltip arrow placement="top" title="Настройки участника">
				<IconButton onClick={hendlOpen}>
					<BorderColor style={{ fontSize: '1rem', color: 'black' }} />
				</IconButton>
			</Tooltip>
			<Menu anchorEl={anEL} open={Boolean(anEL)} onClose={hendlClose}>
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
							<span>
								{!isErrE ? (!isLoadingE ? '00:00.00' : '=✈') : `${isErrE}`}
							</span>
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
							{!isErrQ ? (!isLoadingQ ? 'DSQ' : '=✈') : `${isErrQ}`}
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
							{!isErrN ? (!isLoadingN ? 'DNS' : '=✈') : `${isErrN}`}
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
							✈
						</Button>
					</Tooltip>
					<Dialog
						open={translate}
						onClose={() => setTranslate(false)}
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
							<Button onClick={() => setTranslate(false)}>OK</Button>
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
							♻
						</Button>
					</Tooltip>

					<Dialog
						open={modal}
						onClose={() => setModal(false)}
						role="alertdialog"
						keepMounted
					>
						<DialogTitle sx={{ m: 0, p: 2 }}>
							Редактировать участника
						</DialogTitle>
						<IconButton
							aria-label="close"
							onClick={() => setModal(false)}
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
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={() => setModal(false)}>отмена</Button>
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
