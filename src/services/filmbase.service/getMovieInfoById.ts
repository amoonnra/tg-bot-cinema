import { errorCatcher, logg } from 'utils'
import { movieBaseApi } from 'services/config'
import { MovieFromApi } from 'types'

export async function getMovieInfoById(id: number) {
	try {
		const response = await movieBaseApi<MovieFromApi>('/franchise/details', {
			params: { id },
		})
		
		return response.data
	} catch (error) {
		await logg(error)
		throw errorCatcher(error)
	}
}
