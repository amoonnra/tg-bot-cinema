import { FilmbaseResponse } from 'types'
import { AxiosRequestConfig } from 'axios'
import { transformMovieObj } from './dataTransformers'
import { movieBaseApi } from 'services/config'
import { errorCatcher, logg } from 'utils'
import { getMovieInfoById } from './getMovieInfoById'

export async function getMoviesData(requestConfig: AxiosRequestConfig<any>) {
	try {
		const response = await movieBaseApi<FilmbaseResponse>(requestConfig)

		const result = await Promise.all(
			response.data.results.map(async (el) =>
				transformMovieObj(await getMovieInfoById(el.id))
			)
		)

		return result
	} catch (error) {
		await logg(error)
		throw errorCatcher(error)
	}
}
