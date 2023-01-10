import { isSeriesType, MovieType } from 'types'
import { clearDubles } from './dataTransformers'
import { getMovieData } from './service'
import fs from 'fs/promises'
import pth from 'path'
import { errorCatcher } from 'utils'

export async function appendPremiers() {
	const types: MovieType[] = ['films', 'serials', 'show']

	try {
		for (let type of types) {
			console.log(type)
			const result = await getMovieData({
				url: '/video/news',
				params: {
					type,
					limit: isSeriesType(type) ? 200 : 50,
					year: !isSeriesType(type) ? 2022 : '',
				},
			})

			await fs.writeFile(
				pth.join('db', 'premiers', `${type}.json`),
				JSON.stringify(clearDubles(result).slice(0, 50))
			)
		}
	} catch (error) {
		throw errorCatcher(error)
	}
}
