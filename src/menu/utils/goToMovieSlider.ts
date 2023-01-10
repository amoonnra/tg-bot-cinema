import fs from 'fs/promises'
import path from 'path'

import { MyContext } from 'types'
import { MovieType } from 'types'
import { handleNewMovie } from 'handlers/handleNewMovie'

export const goToMovieSlider = async (
	ctx: MyContext,
	menuSection: string,
	type: MovieType | number
) => {
	ctx.session.listIndex = 0

	const moviesList = JSON.parse(
		await fs.readFile(path.join('db', menuSection, `${type}.json`), 'utf-8')
	)

	ctx.session.moviesList =
		menuSection === 'collections' ? moviesList.entities : moviesList

	handleNewMovie(ctx)
}
