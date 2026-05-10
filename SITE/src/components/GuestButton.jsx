import { useState } from 'react'
import GuestProtocols from './GuestProtocols'
import GuestZapliv from './GuestZapliv'
import { Tooltip } from '@mui/material'
import { AvTimer, ViewTimeline } from '@mui/icons-material'

export default function GuestButton(props) {
	const [show, setShow] = useState(true)
	const setshow = () => setShow((i) => !i)
	const [info, setInfo] = useState(true)
	setTimeout(() => {
		setInfo(false)
	}, 10000)

	return (
		<div style={{ width: '100%', fontFamily: 'Arial' }}>
			<button
				onClick={setshow}
				style={{
					width: '90%',
					whiteSpace: 'pre',
					textAlign: 'left',
					border: '1px',
					fontSize: '1.2rem',
					fontFamily: 'Arial',
					backgroundColor: 'white',
					cursor: 'pointer',
					margin: '0.8rem',
					flexWrap: 'nowrap',
				}}
			>
				<Tooltip
					open={info}
					arrow
					placement="auto-start"
					title="Нажмите кнопку протокол"
				>
					{!show
						? !!props.enru
							? 'Start list'
							: 'Стартовый протокол ( Заплывы )'
						: !!props.enru
							? 'Result card'
							: 'Итоговый протокол ( Результаты )'}
				</Tooltip>
			</button>
			<Tooltip arrow placement="left" title="Нормативы">
				<div style={{ position: 'absolute', right: 10, top: 60 }}>
					<a href="/evsk_2029.pdf" target="_blank" rel="noopener noreferrer">
						<ViewTimeline fontSize="inherit" />
					</a>
				</div>
			</Tooltip>
			{!!show ? (
				<GuestProtocols data={props.data} enru={props.enru} />
			) : (
				<GuestZapliv data={props.data} enru={props.enru} />
			)}
		</div>
	)
}
