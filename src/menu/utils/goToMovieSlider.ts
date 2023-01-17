import fs from 'fs/promises'
import { MyContext } from 'types'
import { MovieType } from 'types'
import { handleNewMovie } from 'handlers/handleNewMovie'

export const goToMovieSlider = async (
	ctx: MyContext,
	menuSection: string,
	type?: MovieType | number
) => {
	ctx.session.listIndex = 0

	const moviesList =
		menuSection === 'bookmarks'
			? ctx.session.userBookmarks
			: JSON.parse(await fs.readFile(`db/content/${menuSection}/${type}.json`, 'utf-8'))

	ctx.session.moviesList =
		menuSection === 'collections' ? moviesList.entities : moviesList

	handleNewMovie(ctx)
}
