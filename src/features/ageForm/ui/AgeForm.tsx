import { useEffect, useState } from 'react'
import { useAgeQuery } from '../hooks/useAgeQuery'
import { useQueryClient } from '@tanstack/react-query'

function AgeForm() {
	const [name, setName] = useState('')
	const [prevName, setPrevName] = useState('')
	const [age, setAge] = useState<number | null>(null)
	const [timerId, setTimerId] = useState<number | null>(null)
	const { isLoading, data, error, refetch } = useAgeQuery(name)

	const queryClient = useQueryClient()

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const form = event.currentTarget
		const inputValue = (form.elements as any)['inputName'].value
		if (inputValue == prevName) {
			return
		}
		if (timerId) {
			clearTimeout(timerId)
		}
		setName(inputValue)
		queryClient.cancelQueries({ queryKey: ['age', prevName] })
		refetch()
		setPrevName(inputValue)
	}

	const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {

		const newName = event.target.value
		if (newName !== '' && !newName.match(/^[A-Za-z]+$/)) {
			return
		}
		setName(newName)
		if (timerId) {
			clearTimeout(timerId)
		}
		const newTimerId = setTimeout(() => {

			if (newName == prevName || newName === '') {
				return
			}

			setName(newName)
			queryClient.cancelQueries({ queryKey: ['age', prevName] })
			refetch()
			setPrevName(newName)
		}, 3000)
		setTimerId(newTimerId)
	}

	useEffect(() => {
		if (!isLoading && data) {
			setAge(data.age)
		}
		if (error) {
			console.error('Error fetching age:', error)
		}
	}, [isLoading, data, error])

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label>
					Имя:
					<input
						name="inputName"
						type="text"
						value={name}
						onChange={handleNameChange}
					/>
				</label>
				<button
					type="submit"
					disabled={name === ''}>
					Получить
				</button>
			</form>
			{age && <div>Возраст: {age}</div>}
		</div>
	)
}

export { AgeForm }