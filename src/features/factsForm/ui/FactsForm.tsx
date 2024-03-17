import { useEffect, useState } from 'react'
import { getFact } from '../api'

function FactsForm() {

	const [fact, setFact] = useState('')
	const [selection, setSelection] = useState({ start: 1, end: 1 })


	useEffect(() => {
		const textField = document.getElementById('factField') as HTMLTextAreaElement
		if (!selection) return
		const { start, end } = selection
		textField.focus()
		textField.setSelectionRange(start, end)
	}, [selection])



	const getNewFact = () => {
		getFact().then(res => {
			setFact(res.fact)
			const textField = document.getElementById('factField') as HTMLTextAreaElement
			if (textField) {
				setSelection({ start: 1, end: 1 })
			}
		})
	}

	return (
		<>
			<button onClick={getNewFact}>Получить факт</button>
			<textarea
				id="factField"
				value={fact}

				style={{
					width: 'auto',
					height: '100px'
				}}
			/>
		</>
	)
}

export { FactsForm }