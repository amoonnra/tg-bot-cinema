import { FilmbaseResponse, FilmbaseResponseItem, MovieType } from 'types'
import { errorCatcher, logg } from 'utils'
import { movieBaseApi } from 'services/config'

export async function findMovieByName(
	name: string,
	type: MovieType
): Promise<FilmbaseResponseItem[]> {
	const year = name?.match(/(.|\()(20|19)\d\d($|\))/gm)?.[0].trim()
	if (year) name = name.slice(0, -1 * (year.length + 1))

	try {
		const response = await movieBaseApi<FilmbaseResponse>('/list', {
			params: { name, type, year, sort: '-views' },
		})

		const result = response.data.results.map(({ id, name, origin_name, year }) => ({
			id,
			name,
			year,
			origin_name,
		}))

		const regex = new RegExp(
			'([^а-яА-Я\\w]|^)' + name.toLowerCase() + '([^а-яА-Я\\w]|$)',
			'gm'
		)

		const relevant = result.filter(
			({ name, origin_name }) =>
				name.toLowerCase().match(regex) || origin_name?.toLowerCase().match(regex)
		)

		return relevant.slice(0, 8)
	} catch (error) {
		await logg(error)
		throw errorCatcher(error)
	}
}