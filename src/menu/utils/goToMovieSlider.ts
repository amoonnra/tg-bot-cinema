import fs from 'fs/promises'
import { MenuRoute, MyContext } from 'types'
import { MovieType } from 'types'
import { handleNewMovie } from 'handlers/handleNewMovie'

export const goToMovieSlider = async (
	ctx: MyContext,
	menuSection: string,
	type?: MovieType | number
) => {
	ctx.session.listIndex = ctx.session.backTo.backIndex && 0
	const moviesList =
		menuSection === 'bookmarks'
			? ctx.session.userBookmarks
			: JSON.parse(await fs.readFile(`db/content/${menuSection}/${type}.json`, 'utf-8'))

	ctx.session.moviesList =
		menuSection === 'collections' ? moviesList.entities : moviesList

	switch (menuSection) {
		case 'collections':
			ctx.session.backTo.route = menuSection
			break
		case 'genres/films':
			ctx.session.backTo.route = 'genresFilms'
			break
		case 'genres/serials':
			ctx.session.backTo.route = 'genresSerials'
			break

		default:
			ctx.session.backTo = { route: null, backIndex: 0 }
			break
	}

	handleNewMovie(ctx)
}
