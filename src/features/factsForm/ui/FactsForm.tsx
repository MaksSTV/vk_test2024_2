import { useEffect, useState } from 'react'
import { useFactQuery } from '../hooks/useFactQuery'

function FactsForm() {

	const [fact, setFact] = useState('')
	const [selection, setSelection] = useState({ start: 1, end: 1 })

	const { isLoading, data, error, refetch } = useFactQuery()

	useEffect(() => {
		const textField = document.getElementById('factField') as HTMLTextAreaElement
		if (!selection) return
		const { start, end } = selection
		textField.focus()
		textField.setSelectionRange(start, end)
	}, [selection])

	const getNewFact = () => {
		refetch()
	}

	useEffect(() => {
		if (!isLoading && data) {
			setFact(data.fact)
			const textField = document.getElementById('factField') as HTMLTextAreaElement
			if (textField) {
				setSelection({ start: 1, end: 1 })
			}
		}
		if (error) {
			console.error('Error fetching age:', error)
		}
	}, [isLoading, data, error])

	return (
		<>
			<button onClick={getNewFact}>Получить факт</button>
			<textarea
				id="factField"
				value={fact}
				onChange={(e) => setFact(e.target.value)}
				style={{
					width: 'auto',
					height: '100px'
				}}
			/>
		</>
	)
}

export { FactsForm }