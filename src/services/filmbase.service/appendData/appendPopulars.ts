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
			let result = []
			if (
				['cartoon', 'cartoon-serials', 'anime', 'anime-serials', 'show'].includes(type)
			) {
				const res23 = await getMoviesData({
					url: '/list',
					params: {
						type,
						sort: '-views',
						limit: 50,
						year: 2023,
						join_seasons: false,
					},
				})
				const res22 = await getMoviesData({
					url: '/list',
					params: {
						type,
						sort: '-views',
						limit: 50,
						year: 2022,
						join_seasons: false,
					},
				})
				result = [...res23, ...res22]
			} else {
				const res = []
				for (let page = 1; page < 9; page++) {
					res.push(
						...(await getMoviesData({
							url: '/list',
							params: {
								type,
								sort: '-views',
								limit: 50,
								join_seasons: false,
								page,
							},
						}))
					)
				}
				result = res.filter((movie) => movie.year > 2021)
			}
			await fs.writeFile(
				`db/content/popular/${type}.json`,
				JSON.stringify(result.slice(0, 50))
			)
			await logg('Добавлены ' + inclinedTypeName[type])
		}
	} catch (error) {
		await logg(error)
		throw errorCatcher(error)
	}
}
