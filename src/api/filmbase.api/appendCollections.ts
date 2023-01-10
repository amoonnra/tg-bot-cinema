import { Collection } from 'types'
import { getMovieData } from './service'
import fs from 'fs/promises'
import pth from 'path'
import { errorCatcher } from 'utils'

export async function appendCollections() {
	try {
		const collections: Collection[] = JSON.parse(
			await fs.readFile(pth.join('db', 'collections', `allCollections.json`), 'utf-8')
		)
		for (let collection of collections) {
			console.log(collection.name)
			const result = await getMovieData({
				url: '/list',
				params: {
					collection_id: collection.id,
					sort: '-year',
				},
			})

			fs.writeFile(
				pth.join('db', 'collections', `${collection.id}.json`),
				JSON.stringify({
					...collection,
					entities: result,
				})
			)
		}
	} catch (error) {
		throw errorCatcher(error)
	}
}
