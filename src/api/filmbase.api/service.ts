import { FilmbaseResponse, MovieFromApi } from 'types'
import { AxiosRequestConfig } from 'axios'
import { errorCatcher } from 'utils'
import { transformMovieObj } from './dataTransformers'
import { movieBaseApi } from 'api/config'
import { getPosterByImdbId } from 'api/tmdb.api/service'

type GetFilmsParams = {
	url: string
	config: AxiosRequestConfig<any>
}

export async function getMovieData(requestConfig: AxiosRequestConfig<any>) {
	try {
		const response = await movieBaseApi<FilmbaseResponse>(requestConfig)

		const result = await Promise.all(
			response.data.results.map(async (el) => {
				const movieData = transformMovieObj(await getMovieInfo(el.id))
				const { imdbId } = movieData

				// if (imdbId) {
				// 	const poster = await getPosterByImdbId('tt' + imdbId)
				// 	if (poster) movieData.poster = poster
				// }

				return movieData
			})
		)
		return result
	} catch (error) {
		throw errorCatcher(error)
	}
}

async function getMovieInfo(id: number) {
	try {
		const response = await movieBaseApi<MovieFromApi>('/franchise/details', {
			params: { id },
		})
		return response.data
	} catch (error) {
		throw errorCatcher(error)
	}
}
