import { MovieType } from "types"
import { clearDubles } from "./dataTransformers"
import { getMovieData } from "./service"
import fs from 'fs/promises'
import pth from 'path'
import { errorCatcher } from "utils"

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
			console.log(type)
			const result = await getMovieData({
				url: '/list',
				params: {
					type,
					sort: '-views',
				},
			})
			
			fs.writeFile(
				pth.join('db', 'popular', `${type}.json`),
				JSON.stringify(result)
			)
		}
	} catch (error) {
		throw errorCatcher(error)
	}
}