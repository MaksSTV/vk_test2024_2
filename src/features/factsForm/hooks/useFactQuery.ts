import { useQuery } from '@tanstack/react-query'
import { getFact } from '../api'

const useFactQuery = () => {

	return useQuery({
		queryKey: ['fact'],
		queryFn: () => getFact(),
		enabled: false,
	})
}

export { useFactQuery }