import { AgeForm } from '../../../features/'

function Age() {

	return (
		<>
			<div className='age'>
				<h1>Возраст по имени</h1>
				<div className="text">
					<p>Давай узнаем, сколько тебе лет!</p>
					<p>Просто введи любое имя</p>
				</div>
				<AgeForm />
			</div>
		</>
	)
}

export { Age }