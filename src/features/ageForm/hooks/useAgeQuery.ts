import { useQuery } from '@tanstack/react-query'
import { getAge } from '../api'

const useAgeQuery = (name: string) => {

	return useQuery({
		queryKey: ['age', name],
		queryFn: () => getAge(name),
		enabled: false,
	})
}

export { useAgeQuery }