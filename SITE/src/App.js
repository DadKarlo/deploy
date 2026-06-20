import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Welcome from './components/Welcome'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Components from './components/Components'
import AddZayvka from './components/AddZayvka'
import { Divider, SwipeableDrawer, Tooltip } from '@mui/material'
import { AdsClick } from '@mui/icons-material'

// const url = new URL(document.URL)
// console.log(url.pathname)
console.log('© Дмитрий Щербаков. Все права защищены.')
console.log(
	'\tУважаемый разработчик. \n\tДанная программа предназначена исключительно для поддержки деятельности тренеров и спортсменов. Любые несанкционированные изменения могут негативно повлиять на работу системы. Просьба пользоваться исключительно предусмотренным интерфейсом пользователя. \n\tСпасибо за понимание и сотрудничество!\n\tС уважением, \nАдминистрация платформы! ',
) // console it

function NoSEO() {
	const location = useLocation()

	useEffect(() => {
		const exMeta = document.querySelector('meta[name="robots"]')
		if (exMeta) {
			exMeta.remove()
		}

		if (location.pathname !== '/') {
			if (!/\d/.test(location.pathname)) {
				const meta = document.createElement('meta')
				meta.name = 'robots'
				meta.content = 'noindex, nofollow'
				document.head.appendChild(meta)
			}
		}
	}, [location.pathname])

	return null
}

function App() {
	const [lenguageRU, setlenguageRU] = useState(false)
	// const set = () => setlenguageRU((i) => !i)
	const set = () => setlenguageRU((i) => i)

	const [shotInfo, setShotInfo] = useState(false)

	const adText = lenguageRU
		? 'For your marketing. Email: swim.sport@mail.ru'
		: 'Место для вашей рекламы. Email: swim.sport@mail.ru'

	return (
		<div className="App">
			<div className="ad-banner">
				<div className="ad-banner-content">
					<a href="mailto:swim.sport@mail.ru" className="ad-link">
						{adText}
					</a>
				</div>
			</div>
			<Tooltip title="Меню информации">
				<button className="lang-toggle-btn" onClick={() => setShotInfo(true)}>
					<AdsClick color="red" />
				</button>
			</Tooltip>
			<SwipeableDrawer
				anchor="right"
				open={shotInfo}
				onClose={() => setShotInfo(false)}
				onOpen={() => setShotInfo(true)}
				sx={{ fontFamily: 'Arial', margin: '1rem' }}
			>
				<span style={{ margin: '20px' }}>
					<a
						href="https://swim-start.ru"
						style={{
							color: 'black',
							textDecoration: 'none',
						}}
					>
						<b>Главная страница</b>
					</a>
				</span>
				<Divider />
				<span style={{ margin: '10px 20px' }}>
					<a
						href="/evsk_2029.pdf"
						target="_blank"
						rel="noopener noreferrer"
						style={{
							color: 'black',
							textDecoration: 'none',
						}}
					>
						Нормативы
					</a>
				</span>
				<span style={{ margin: '10px 20px' }}>
					<a
						href="/instruction.pdf"
						target="_blank"
						rel="noopener noreferrer"
						style={{
							color: 'black',
							textDecoration: 'none',
						}}
					>
						Инструкция
					</a>
				</span>
				<span style={{ margin: '10px 20px' }}>
					<a
						href="https://t.me/swimsportru"
						style={{
							color: 'black',
							textDecoration: 'none',
						}}
					>
						Помощь
					</a>
				</span>
				<span style={{ margin: '10px 20px' }}>
					<b>Контакты:</b>
				</span>
				<span style={{ margin: '5px 20px', fontSize: '0.9rem' }}>
					<a href="mailto:swim.sport@mail.ru">Реклама</a>
				</span>
				<span style={{ margin: '5px 20px', fontSize: '0.9rem' }}>
					<a href="">MAX</a>
				</span>
				<span style={{ margin: '5px 20px', fontSize: '0.9rem' }}>
					<a href="https://t.me/swimsportru">Telegram</a>
				</span>
			</SwipeableDrawer>
			<BrowserRouter>
				<div>
					<NoSEO />
					<Routes>
						<Route path="/" element={<Welcome enru={lenguageRU} />} />
						<Route path="/:id" element={<Components enru={lenguageRU} />} />
						<Route path="/:id/:res" element={<AddZayvka enru={lenguageRU} />} />
						<Route path="*" element={<Navigate to="/" />} />
					</Routes>
				</div>
			</BrowserRouter>
			<footer className="app-footer">
				<hr />
				{!lenguageRU
					? '© Дмитрий Щербаков. Все права защищены.'
					: '© Dmitry Shcherbakov. Copyright. All rights reserved.'}
			</footer>
		</div>
	)
}
export default App
