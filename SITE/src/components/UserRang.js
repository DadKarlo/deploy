import { useState } from 'react'
// переделать дети и взрослые
//enru={props.enru}
function UserRang(props) {
	const [sex, setSex] = useState('')
	const [group, setGroup] = useState('')
	const [category, setCategory] = useState('')

	const handleCangeSex = (e) => {
		setSex(e.target.value)
		props.sex(e.target.value)
	}
	const handleCangeGroup = (e) => {
		setGroup(e.target.value)
		props.group(e.target.value)
	}
	const handleCangeCategory = (e) => {
		setCategory(e.target.value)
		props.category(e.target.value)
	}

	const listGroup = props?.data?.sportsmens?.filter(
		(person, index, self) =>
			index === self.findIndex((p) => p.group === person.group),
	)

	const listCategory = props?.data?.sportsmens?.filter(
		(person, index, self) =>
			index === self.findIndex((p) => p.category === person.category),
	)

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<select
				style={{
					padding: '3px',
					border: '1px solid',
					borderRadius: '5px',
					width: '50%',
					fontFamily: 'Arial',
					boxSizing: 'border-box',
					marginBottom: '0.4rem',
					textAlign: 'center',
				}}
				value={sex}
				onChange={handleCangeSex}
			>
				<option value={!!props.enru ? 'Men' : 'Мужчины'}>
					{!!props.enru ? 'Men' : 'Мужчины'}
				</option>
				<option value={!!props.enru ? 'Women' : 'Женщины'}>
					{!!props.enru ? 'Women' : 'Женщины'}
				</option>
				<option value={!!props.enru ? `Girls` : 'Девушки'}>
					{!!props.enru ? `Girls` : 'Девушки'}
				</option>
				<option value={!!props.enru ? `Boys` : 'Юноши'}>
					{!!props.enru ? `Boys` : 'Юноши'}
				</option>
				<option value={!!props.enru ? ` ` : ' '}>
					{!!props.enru ? `Other` : 'Другое'}
				</option>
			</select>
			<input
				style={{
					padding: '3px',
					border: '1px solid',
					borderRadius: '5px',
					width: '50%',
					fontFamily: 'Arial',
					boxSizing: 'border-box',
					marginBottom: '0.4rem',
					textAlign: 'center',
				}}
				type="text"
				name="category"
				list="datalistcategory"
				pattern="[A-Za-zА-ЯЁа-яё0-9\s\-\.\,\(\)]{1,50}"
				title={
					'При необходимости разделить Участников в протоколах. Можно использовать A-z и А-я, символы: - , . ( )'
				}
				maxLength={50}
				value={category}
				onChange={handleCangeCategory}
				placeholder={!!props.enru ? 'Category *' : 'Категория *'}
			/>
			<datalist id="datalistcategory">
				{listCategory?.map((item, index) => (
					<option key={index} value={item.category} />
				))}
			</datalist>
			<input
				style={{
					padding: '3px',
					border: '1px solid',
					borderRadius: '5px',
					width: '50%',
					fontFamily: 'Arial',
					boxSizing: 'border-box',
					marginBottom: '0.4rem',
					textAlign: 'center',
				}}
				type="text"
				name="group"
				list="datalistgroup"
				pattern="[A-Za-zА-ЯЁа-яё0-9\s\-\.\,\(\)]{1,50}"
				title={
					'При необходимости разделить Участников в протоколах. Можно использовать A-z и А-я, символы: - , . ( )'
				}
				maxLength={50}
				value={group}
				onChange={handleCangeGroup}
				placeholder={!!props.enru ? 'Group *' : 'Группа *'}
			/>
			<datalist id="datalistgroup">
				{listGroup?.map((item, index) => (
					<option key={index} value={item.group} />
				))}
			</datalist>
		</div>
	)
}
export default UserRang
