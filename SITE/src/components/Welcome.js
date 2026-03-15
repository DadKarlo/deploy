import { useState } from 'react'
import { API_site } from '../API_URL'

export default function Welcome(props) {
	const [showinstr, setShowinstr] = useState(true)
	const setinstr = () => setShowinstr((i) => !i)

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
						padding: '5px',
						border: '1px solid',
						borderRadius: '5px',
						width: '100%',
						boxSizing: 'border-box',
						margin: '1rem',
					}}
					type="text"
					name="login"
					pattern="[A-Za-z]{10,110}"
					maxLength={110}
					title={'Введите от 10 до 100 английских симовлов!'}
					required
					placeholder={!!props.enru ? 'Login Name' : 'Введите название'}
				/>
				<button
					style={{
						padding: '3px',
						borderRadius: '5px',
						width: '40%',
						color: 'white',
						backgroundColor: 'blue',
						fontFamily: 'Arial',
						boxSizing: 'border-box',
						fontSize: '120%',
						cursor: 'pointer',
					}}
				>
					{!!props.enru ? 'Enter' : 'Вход'}
				</button>
			</form>
			<button
				onClick={setinstr}
				type="button"
				style={{
					margin: '1rem',
					border: '1px',
					fontSize: '1rem',
					width: '50%',
					fontFamily: 'Arial',
					backgroundColor: 'white',
					textAlign: 'center',
				}}
			>
				{!!showinstr
					? !!props.enru
						? 'Instruction ⌵'
						: 'Инструкция ⌵'
					: !!props.enru
						? 'Close ^'
						: 'Скрыть ^'}
			</button>
			{!showinstr ? (
				!props.enru ? (
					<>
						<ol style={{ textAlign: 'left', margin: '2rem' }}>
							<hr />
							<li>
								Ваш логин используется исключительно для входа в систему.
								Пожалуйста, бережно храните его и не передавайте третьим лицам.
							</li>
							<li>Используйте уникальное название для разных соревнований</li>
							<li>
								В любом случае вход в систему завершится успешно, либо страничка
								создается новая, либо вы попадете в личный кабинет.
							</li>
							<li>
								Информация на сайте обновляется каждые 5 секунд. После внесения
								изменений подождите указанное время перед проверкой обновлений.
							</li>
							<li>Если аккаунт занят, пожалуйста, не используйте его!</li>
							<hr />
						</ol>
						<ul style={{ width: '90%', textAlign: 'left' }}>
							<li>
								Эта программа предназначена для упрощения процесса подготовки и
								проведения соревнований среди специалистов и тренеров в области
								плавания.
							</li>
							<li>
								Для входа в программу используйте предоставленный логин, который
								также является вашей адресной строкой. Этот логин необходим для
								редактирования текущих соревнований, пожалуйста, не делитесь ним
								с третьими лицами.
							</li>
							<li>
								Участникам и зрителям предоставляется отдельная ссылка для
								просмотра соревнований, которую организаторы могут
								распространять свободно.
							</li>
							<li>
								Тренерский состав может воспользоваться вашей ссылкой для
								добавления участников в соревнование. Данные обновляются
								автоматически каждые 5 секунд в случае подключения к интернету.
								Индикация подключения находится в верхнем правом углу.
							</li>
							<li>
								Распределения заплывов тесно связана с общей структурой
								соревнований, экспериментируйте и трестируйте с настройками
								чтобы добиться нужного результата.
							</li>
							<li>
								При случайном внесении одинаковых данных смело воспользуйтесь
								функцией удаления дубликатов. Не используйте эту функцию если
								данные нужны для дублирования.
							</li>
							<li>
								Функция «Очистить» очищает поля ввода и обновляет данные
								участников, пожалуйста дождитесь загрузки данных и продолжайте
								работу
							</li>
							<li>
								Добавление участника доступно по трем вложенным спискам, а так
								же одна дополнительная дистанция (пожалуйста используйте ее по
								необходимости, если надо внести более трех дистанции добавьте
								участника и повторите ввод данных)
							</li>
							<li>
								Дополнительная дистанция используется для установки эстафеты, а
								так же дистанций которых нет в списке. Будьте внимательны при
								заполнении полей, ошибка может привести к неправильному
								распределению заплывов. Рекомендуется использовать Copy & Paste
							</li>
							<li>
								Заполняйте категории и группы спортсменов только тогда, когда
								это действительно необходимо. Распределение заплывов и
								протоколов независимы друг от друга, при вводе категории и
								группы протоколы всегда будут разделены
							</li>
							<li>
								В протоколах время фиксируется окончательно, однако спортсмен
								может быть дисквалифицирован администратором путём нажатия
								кнопки «DSQ», расположенной рядом с результатом.
							</li>
							<li>
								Результаты участников вводятся рядом с заявочным временем в
								столбце «Время». Данные заплывов сразу поступают в протоколы
								соревнований.
							</li>
							<li>
								Чтобы добавить нового участника в заплыв, воспользуйтесь кнопкой
								«+». Обязательно укажите номер заплыва (№) и дорожку (/⊥\).
								Такой способ позволяет добавлять спортсменов без изменения
								существующей структуры заплывов.
							</li>
							<li>
								Изменять имена участников и команды возможно непосредственно в
								структуре заплывов.
							</li>
							<li>
								Кнопка-шестерёнка (⚙) открывает дополнительные опции управления
								участником.
							</li>
							<li>
								♻: ранее введённый результат обнуляется и не попадает в итоговые
								протоколы.
							</li>
							<li>
								DSQ: участник дисквалифицируется и помечается соответствующим
								образом в протоколах.
							</li>
							<li>
								DNS: участник отсутствует на старте и отмечается в протоколах
								как не стартовавший.
							</li>
							<li>
								№ и /⊥\ : при одновременном введении номера заплыва и дорожки
								положение участника меняется автоматически. Будьте осторожны при
								перемещении спортсмена из одного заплыва в другой. Для
								автоматического формирования порядка заплывов рекомендуется
								воспользоваться функцией «Обновить структуру».
							</li>
							<li>❌: удаляет участника.</li>
						</ul>
						<br />
						<br />
					</>
				) : (
					<>
						<ol style={{ textAlign: 'left', margin: '2rem' }}>
							Rules
							<li>
								Your login credentials are intended solely for accessing the
								system. Keep them secure and never disclose them to unauthorized
								individuals.
							</li>
							<li>
								Always assign distinct titles to differentiate between various
								events.
							</li>
							<li>
								Logging in will always succeed—either by creating a new event
								page or granting access to your personal account.
							</li>
							<li>
								Website content refreshes every 5 seconds. Wait the designated
								interval after any modifications before verifying updates.
							</li>
							<li>
								If an account appears occupied, refrain from using it until it's
								available again.
							</li>
						</ol>
						<ul style={{ width: '90%', textAlign: 'left' }}>
							Instructions
							<li>
								This software streamlines the preparation and execution of
								competitive swimming events specifically tailored for
								professionals and coaches within the swimming community.
							</li>
							<li>
								Access the platform via the assigned login details, serving both
								as your username and address bar identifier. These credentials
								are essential for modifying existing competitions; avoid sharing
								them publicly.
							</li>
							<li>
								Separate links are issued to participants and viewers for
								observing competitions, allowing organizers to disseminate these
								freely without restrictions.
							</li>
							<li>
								Coaching personnel utilize your provided link to register
								athletes into scheduled contests. Automated data synchronization
								occurs every 5 seconds while online connectivity remains active.
								A connection status icon resides in the upper-right corner for
								monitoring purposes.
							</li>
							<li>
								Lane assignments directly correlate with broader competition
								frameworks. Feel free to experiment with configurations to
								optimize outcomes during setup phases.
							</li>
							<li>
								In case duplicate entries occur unintentionally, feel
								comfortable utilizing the deduplication tool. However, refrain
								from applying this option if duplicating records intentionally
								aligns with specific requirements.
							</li>
							<li>
								Pressing "Clear" resets all input forms and retrieves fresh
								competitor datasets. Allow sufficient loading times prior to
								resuming operations.
							</li>
							<li>
								Participant addition involves selecting options across three
								hierarchical drop-down menus supplemented by an extra distance
								parameter (use sparingly unless truly needed). Repeat entries by
								registering multiple participants should additional distances
								beyond the initial three require inclusion.
							</li>
							<li>
								Extra distance parameters facilitate relay setups alongside
								uncommon stroke variations absent from standard selections.
								Exercise caution while completing form fields since inaccuracies
								might skew lane allocations. Copy-and-paste functionality
								minimizes potential errors.
							</li>
							<li>
								Assign athlete categories and groupings judiciously, limiting
								usage strictly where indispensable.
							</li>
							<li>
								Lane assignment processes remain decoupled from protocol
								generation activities. Inputting category/group attributes
								ensures consistent separation across protocols regardless of
								configuration choices.
							</li>
						</ul>
						<br />
						<br />
					</>
				)
			) : (
				<></>
			)}
		</div>
	)
}
