import { useState } from 'react'
import { API_site } from '../API_URL'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from '@mui/material'

export default function ButtonDSQ(props) {
	const [isLoadingQ, setIsLoadingQ] = useState(false)
	const [isErrQ, setIsErrQ] = useState('')
	const [dialogUpdate, setDialogUpdate] = useState(false)

	const setUserDSQ = async (e) => {
		e.preventDefault()
		setIsLoadingQ(true)
		setDialogUpdate(false)
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
			}, 1970)
		} catch (error) {
			// console.log(error)
			setIsErrQ('⚠!')
			setTimeout(() => {
				setIsErrQ('')
			}, 1970)
		}
		setIsLoadingQ(false)
	} //send setswim

	return (
		<>
			<button
				onClick={() => setDialogUpdate(true)}
				style={{
					fontSize: '0.5rem',
					backgroundColor: 'white',
					padding: '1px',
					borderRadius: '3px',
				}}
			>
				{!isErrQ ? (!isLoadingQ ? 'DSQ' : '=✈') : `${isErrQ}`}
			</button>
			<Dialog
				open={dialogUpdate}
				onClose={() => setDialogUpdate(false)}
				role="alertdialog"
				keepMounted
			>
				<DialogContent>
					<DialogTitle>Подтвердите действие</DialogTitle>
					Дисквалификация участника полностью аннулирует результат спортсмена
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setDialogUpdate(false)}>отмена</Button>
					<Button onClick={setUserDSQ} sx={{ color: 'orange' }}>
						дисквалифицировать
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}
