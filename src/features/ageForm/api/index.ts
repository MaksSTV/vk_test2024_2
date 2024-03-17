import { IResponseAge } from '../../../shared'

export async function getAge(name: string): Promise<IResponseAge> {

	const response = await fetch(`https://api.agify.io/?name=${name}`)
	if (!response.ok) {
		throw new Error("Failed to fetch facts")
	}
	return response.json()

}