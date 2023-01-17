import fs from 'fs/promises'
import { inclinedTypeName, isSeriesType, MovieType } from 'types'
import { clearDubles } from '../dataTransformers'
import { errorCatcher, logg } from 'utils'
import { getMoviesData } from '../getMoviesData'

export async function appendPremiers() {
	const types: MovieType[] = ['films', 'serials', 'show']

	try {
		for (let type of types) {
			const result = await getMoviesData({
				url: '/video/news',
				params: {
					type,
					limit: isSeriesType(type) ? 200 : 50,
					year: !isSeriesType(type) ? 2022 : '',
				},
			})

			await fs.writeFile(
				`db/content/premiers/${type}.json`,
				JSON.stringify(clearDubles(result).slice(0, 50))
			)

			await logg('Добавлены ' + inclinedTypeName[type])
		}
	} catch (error) {
		await logg(error)
		throw errorCatcher(error)
	}
}