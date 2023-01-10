import { tmdbApi } from 'api/config'
import { AxiosRequestConfig } from 'axios'
import { TmdbResponse } from 'types'
import { errorCatcher } from 'utils'
import { transformSearchedData } from './dataTransform'

export async function getMovieData(requestConfig: AxiosRequestConfig<any>) {
	try {
		const response = await tmdbApi<TmdbResponse>(requestConfig)
		return response.data
	} catch (error) {
		throw errorCatcher(error)
	}
}

export async function getPosterByImdbId(imdbId: string) {
	try {
		const result = await tmdbApi<TmdbResponse>({
			url: `/find/${imdbId}`,
			params: {
				external_source: 'imdb_id',
			},
		})
		const transformedData = transformSearchedData(result.data)
		if (!transformedData) return null

		const poster = await getPosterByTmdbId(transformedData)
		if (!poster) return null

		const posterUrl = 'https://www.themoviedb.org/t/p/w500_and_h282_face' + poster

		return posterUrl
	} catch (error) {
		throw errorCatcher(error)
	}
}

interface ImagesResponse {
	backdrops: {
		iso_639_1: string
		file_path: string
	}[]
}

export async function getPosterByTmdbId({
	id,
	type,
}: {
	id: number
	type: 'movie' | 'tv'
}) {
	const result = await tmdbApi<ImagesResponse>({
		url: `/${type}/${id}/images`,
		params: {
			include_image_language: 'en,ru',
		},
	})

	const { backdrops } = result.data
	const ruBackdrops = backdrops.filter(({ iso_639_1: lang }) => lang === 'ru')
	const enBackdrops = backdrops.filter(({ iso_639_1: lang }) => lang === 'en')

	if (ruBackdrops.length) return ruBackdrops[0].file_path
	if (enBackdrops.length) return enBackdrops[0].file_path

	return null
}
