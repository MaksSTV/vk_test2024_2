import { IResponse } from '../../../shared'

export async function getFact(): Promise<IResponse> {

	const response = await fetch('https://catfact.ninja/fact')
	if (!response.ok) {
		throw new Error("Failed to fetch facts")
	}
	return response.json()
}