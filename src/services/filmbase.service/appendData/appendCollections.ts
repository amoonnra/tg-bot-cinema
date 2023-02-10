import fs from 'fs/promises'
import { Collection } from 'types'
import { errorCatcher, logg } from 'utils'
import { getMoviesData } from '../getMoviesData'

export async function appendCollections() {
	try {
		const collections: Collection[] = JSON.parse(
			await fs.readFile('db/content/collections/allCollections.json', 'utf-8')
		)
		
		for (let collection of collections) {
			const result = await getMoviesData({
				url: '/list',
				params: {
					collection_id: collection.id,
					sort: '-year',
				},
			})

			await fs.writeFile(
				`db/content/collections/${collection.id}.json`,
				JSON.stringify({
					...collection,
					entities: result,
				})
			)
			await logg('Загружена подборка: ' + collection.name)
		}
	} catch (error) {
		await logg(error)
		throw errorCatcher(error)
	}
}
