export default function Hronometrist(props) {
	const styleStart = {
		width: '90%',
		maxWidth: '800px',
		height: '9rem',
		marginTop: '2rem',
		backgroundColor: 'darkgreen',
		color: 'white',
		fontSize: '5rem',
	}
	const styleWait = {
		width: '90%',
		maxWidth: '800px',
		height: '9rem',
		marginTop: '2rem',
		backgroundColor: 'lightgrey',
		color: 'black',
		fontSize: '5rem',
	}
	const styleFinish = {
		width: '90%',
		maxWidth: '800px',
		height: '9rem',
		marginTop: '2rem',
		backgroundColor: 'goldenrod',
		color: 'black',
		fontSize: '3em',
	}

	return (
		<div style={{}}>
			<h1 style={{ margin: '1rem' }}>Дорожка № {props.idr}</h1>
			<hr />
			<h2>Заплыв №: {props.ind.idz}</h2>
			<h3>Дистанция: {props.ind.ids}</h3>
			{props.ind.ind === 0 ? (
				props.hrono === 0 ? (
					<div>
						<button style={styleStart}>STOP</button>
						<h3>TIME:</h3>
					</div>
				) : (
					<button style={styleFinish}>TIME: 05:34.78</button>
				)
			) : (
				<button style={styleWait}>Ожидайте</button>
			)}
		</div>
	)
}
