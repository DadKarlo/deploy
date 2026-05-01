import { useEffect, useState } from 'react'
import GuestButton from './GuestButton'
import { API_site } from '../API_URL'
import HelmetR from './HelmetR'

function Guest(props) {
	//sse подключить!!!
	const [data, setData] = useState([])

	useEffect(() => {
		if (props.www) {
			setData(JSON.parse(props.www))
		}
	}, [props.www])

	useEffect(() => {
		if (data?.setup?.NameTitle) {
			if (data?.setup?.NameTitle !== ''.trim()) {
				document.title = `${data?.setup?.NameTitle}`
			}
		} else {
			document.title = 'Соревнования по плаванию | Competitive Swimming'
		}
	}, [data])

	useEffect(() => {
		//!!!
		const user = new URL(document.URL)
		const sse = new EventSource(API_site + `${user.pathname}`) //!!!SSE variant
		sse.onopen = () => {
			// console.log('onopen')
			props.sse(true)
		}
		sse.onmessage = async (e) => {
			const data = await JSON.parse(e.data)
			// console.log(data, 'sse')
			setData(data)
		}
		sse.onerror = (_err) => {
			props.sse(false)
			// console.log(err)
		}
		return () => {
			sse.close()
			props.sse(false)
			// console.log('close')
		}
	}, []) //!!!SSE

	return (
		<>
			<GuestButton data={data} enru={props.enru} />
			<HelmetR
				title={data?.setup?.NameTitle}
				description={data?.setup?.Info}
				image="https://swim-start.ru/og-image.png"
				url={`https://swim-start.ru/${data?.setup?.URLCLIENT}`}
			/>
		</>
	)
}

export default Guest
