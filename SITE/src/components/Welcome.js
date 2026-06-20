// import { useState } from 'react'
import { API_site } from '../API_URL'

export default function Welcome(props) {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				marginTop: '1rem',
			}}
		>
			<h1>{!!props.enru ? 'Hello and Welcome ' : 'Добро пожаловать '}!</h1>
			<div
				style={{
					width: '70%',
					padding: '1px',
					border: '1px solid',
					borderRadius: '15px',
					boxShadow: '2px 2px 4px rgba(0,0,0,0.5)',
				}}
			>
				<h5 style={{ marginTop: '0.7rem' }}>
					{!!props.enru
						? 'Welcome to a convenient platform for swimming competitions!'
						: 'Вас приветствует платформа для проведения соревнований по плаванию! '}
				</h5>
				<h4 style={{ margin: '1rem' }}>
					{!!props.enru
						? 'Please read the instructions and rules for using the platform.'
						: 'Пожалуйста, ознакомьтесь с инструкцией и правилами пользования сайтом.'}
				</h4>
				<h5 style={{ marginBottom: '0.7rem' }}>
					{!!props.enru ? (
						<a
							style={{ textDecoration: 'none', color: 'black' }}
							href="https://t.me/swimsportru"
						>
							Questions and suggestions: t.me/swimsportru
						</a>
					) : (
						<a
							style={{ textDecoration: 'none', color: 'black' }}
							href="https://t.me/swimsportru"
						>
							Вопросы и предложения: t.me/swimsportru
						</a>
					)}
				</h5>
			</div>
			<form
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'end',
					height: '7rem',
				}}
				action={API_site + '/login'}
				method="post"
			>
				<input
					style={{
						padding: '9px',
						border: '1px solid',
						borderRadius: '5px',
						width: '130%',
						boxSizing: 'border-box',
						margin: '0.5rem',
						boxShadow: '2px 2px 4px rgba(0,0,0,0.5)',
					}}
					type="text"
					name="login"
					autoFocus
					pattern="[A-Za-z]{10,110}"
					maxLength={110}
					title={'Введите или создайте логин от 10 до 100 английских симовлов!'}
					required
					placeholder={
						!!props.enru ? 'Login Name' : 'Введите или создайте логин'
					}
				/>
				<button
					style={{
						padding: '5.5px',
						borderRadius: '5px',
						width: '40%',
						color: 'white',
						backgroundColor: 'blue',
						fontFamily: 'Arial',
						boxSizing: 'border-box',
						fontSize: '120%',
						cursor: 'pointer',
						boxShadow: '2px 2px 4px darkblue',
					}}
				>
					{!!props.enru ? 'Enter' : 'Вход'}
				</button>
			</form>
			<div style={{ height: '4rem' }} />
			<div style={{ fontFamily: 'Arial', margin: '1rem' }}>
				<a
					href="/instruction.pdf"
					target="_blank"
					rel="noopener noreferrer"
					style={{
						color: 'black',
						textDecoration: 'none',
						padding: '12px 16px',
						border: '1px solid',
						borderRadius: '5px',
						boxShadow: '2px 2px 4px rgba(0,0,0,0.5)',
					}}
				>
					Инструкция
				</a>{' '}
				<a
					href="/evsk_2029.pdf"
					target="_blank"
					rel="noopener noreferrer"
					style={{
						color: 'black',
						textDecoration: 'none',
						padding: '12px 16px',
						border: '1px solid',
						borderRadius: '5px',
						boxShadow: '2px 2px 4px darkblue',
					}}
				>
					Нормативы 2026-2029
				</a>
			</div>
		</div>
	)
}
