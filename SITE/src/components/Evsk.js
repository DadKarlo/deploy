import evsk from '../EVSK-FINA.json'

export default function Evsk({ sex, pool, distance, time }) {
	let sexid

	if (sex === 'Мужчины' || sex === 'Юноши') {
		sexid = 'man'
	} else if (sex === 'Девушки' || sex === 'Женщины') {
		sexid = 'woman'
	} else {
		sexid = ' '
	}

	const normativ = evsk?.[sexid]?.[pool]?.[distance]

	let resevsk

	if (Number(time) <= Number(normativ && normativ['МСМК'])) {
		resevsk = 'МСМК'
	} else if (Number(time) <= Number(normativ && normativ['МС'])) {
		resevsk = 'МС'
	} else if (Number(time) <= Number(normativ && normativ['КМС'])) {
		resevsk = 'КМС'
	} else if (Number(time) <= Number(normativ && normativ['1'])) {
		resevsk = '|'
	} else if (Number(time) <= Number(normativ && normativ['2'])) {
		resevsk = '||'
	} else if (Number(time) <= Number(normativ && normativ['3'])) {
		resevsk = '|||'
	} else if (Number(time) <= Number(normativ && normativ['1юн'])) {
		resevsk = '1юн'
	} else if (Number(time) <= Number(normativ && normativ['2юн'])) {
		resevsk = '2юн'
	} else if (Number(time) <= Number(normativ && normativ['3юн'])) {
		resevsk = '3юн'
	} else {
		resevsk = ' '
	}

	return (
		<div>
			<section>{resevsk}</section>
		</div>
	)
}
