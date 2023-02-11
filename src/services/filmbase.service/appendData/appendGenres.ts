import fs from 'fs/promises'
import { Collection, inclinedTypeName, MovieType } from 'types'
import { errorCatcher, logg } from 'utils'
import { getMoviesData } from '../getMoviesData'

export async function appendGenres() {
	const types: MovieType[] = ['films', 'serials']
	const genres: Collection[] = JSON.parse(
		await fs.readFile(`db/content/genres/allGenres.json`, 'utf-8')
	)

	try {
		for (let type of types) {
			for (let { id, name } of genres) {
				let result = await getMoviesData({
					url: '/list',
					params: {
						type,
						genre_id: id,
						sort: '-kinopoisk',
						limit: 100,
						join_seasons: false,
					},
				})

				await fs.writeFile(
					`db/content/genres/${type}/${id}.json`,
					JSON.stringify(result.filter((movie) => movie.year > 1960).slice(0, 50))
				)
				await logg(
					'Добавлены ' +
						inclinedTypeName[type] +
						' жанра - ' +
						name +
						'   число --- ' +
						result.length
				)
			}
		}
	} catch (error) {
		await logg(error)
		throw errorCatcher(error)
	}
}
