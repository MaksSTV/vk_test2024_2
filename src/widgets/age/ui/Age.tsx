import { AgeForm } from '../../../features/'

function Age() {

	return (
		<>
			<div className='age'>
				<h1>Возраст по имени</h1>
				<div className="text">
					<p>Давай узнаем, сколько лет человеку по его имени!</p>
					<p>Просто введи имя человека на латинице</p>
				</div>
				<AgeForm />
			</div>
		</>
	)
}

export { Age }