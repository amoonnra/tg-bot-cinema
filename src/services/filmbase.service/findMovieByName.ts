import { FilmbaseResponse, FilmbaseResponseItem, MovieType } from 'types'
import { errorCatcher, logg } from 'utils'
import { movieBaseApi } from 'services/config'

export async function findMovieByName(
	name: string,
	type: MovieType | null
): Promise<FilmbaseResponseItem[]> {
	const year = name
		?.match(/(.|\(|\s\()(20|19)\d\d($|\))/gm)?.[0]
		.replace(/(\(|\))/gm, '')
		.trim()
	if (year) name = name.replace(/(.|\(|\s\()(20|19)\d\d($|\))/gm, '').trim()

	try {
		const response = await movieBaseApi<FilmbaseResponse>('/list', {
			params: { name, type, year, limit: type ? 50 : 150, sort: '-views' },
		})

		const result = response.data.results.map(({ id, name, origin_name, year, type }) => ({
			id,
			name,
			year,
			origin_name,
			type,
		}))

		const regex = new RegExp(
			'([^а-яА-Я\\w]|^)' + name.toLowerCase() + '([^а-яА-Я\\w]|$)',
			'gm'
		)

		const relevant = result.filter(
			({ name, origin_name }) =>
				name.toLowerCase().match(regex) || origin_name?.toLowerCase().match(regex)
		)
		console.log(relevant)
		return relevant.slice(0, 8)
	} catch (error) {
		await logg(error)
		throw errorCatcher(error)
	}
}
