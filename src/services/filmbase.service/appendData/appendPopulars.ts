import fs from 'fs/promises'
import { inclinedTypeName, MovieType } from 'types'
import { errorCatcher, logg } from 'utils'
import { getMoviesData } from '../getMoviesData'

export async function appendPopulars() {
	const types: MovieType[] = [
		'films',
		'serials',
		'cartoon',
		'cartoon-serials',
		'anime',
		'anime-serials',
		'show',
	]

	try {
		for (let type of types) {
			const result = await getMoviesData({
				url: '/list',
				params: {
					type,
					sort: '-views',
					// year: '2022'
				},
			})

			await fs.writeFile(`db/content/popular/${type}.json`, JSON.stringify(result))
			await logg('Добавлены ' + inclinedTypeName[type])
		}
	} catch (error) {
		await logg(error)
		throw errorCatcher(error)
	}
}
