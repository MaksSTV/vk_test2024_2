import { useRef, useState } from 'react'

function AgeForm() {
	const [name, setName] = useState('')
	const [age, setAge] = useState('')
	const [prevQuery, setPrevQuery] = useState('')
	const timerRef = useRef(0)

	const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newName = event.target.value
		setName(newName)
		// Отменяем предыдущий таймер, если он был установлен
		if (timerRef.current !== null) {
			clearTimeout(timerRef.current)
		}
		// Устанавливаем новый таймер для отправки запроса через 3 секунды после ввода имени
		timerRef.current = setTimeout(() => {
			fetchAge(newName)
		}, 3000)
	}

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault()
		fetchAge(name)
	}

	const fetchAge = async (newName: string) => {
		// Проверяем, не отправляли ли уже запрос с таким именем
		console.log(prevQuery, newName)
		if (newName === prevQuery || newName === '') {
			return
		}
		setPrevQuery(newName)
		try {
			const response = await fetch(`https://api.agify.io/?name=${newName}`)
			if (!response.ok) {
				throw new Error('Failed to fetch age')
			}
			const data = await response.json()
			setAge(data.age)
		} catch (error) {
			console.error('Error fetching age:', error)
		}
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<label>
					Имя:
					<input type="text" value={name} onChange={handleNameChange} />
				</label>
				<button type="submit" disabled={name === ''} >Получить возраст</button>
			</form>
			{age && <div>Возраст: {age}</div>}
		</>
	)
}

export { AgeForm }