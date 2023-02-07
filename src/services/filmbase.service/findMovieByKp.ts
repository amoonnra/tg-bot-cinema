import { logg } from 'utils'
import { movieBaseApi } from 'services/config'
import { MovieFromApi } from 'types'

export async function findMovieByKp(kinopoisk_id: number) {
	try {
		const response = await movieBaseApi<MovieFromApi>('/franchise/details', {
			params: { kinopoisk_id },
		})

		return response.data
	} catch (error) {
		await logg('Search by kp id Error — ' + error)
		return null
	}
}
