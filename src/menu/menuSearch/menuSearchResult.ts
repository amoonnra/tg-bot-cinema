import { Menu, MenuRange } from '@grammyjs/menu'
import Config from 'conf'
import { handleNewMovie } from 'handlers'
import { navToMenuSection } from 'menu/utils'
import { movieTypeNamesInSearch, MyContext } from 'types'
import { getMovieInfoById, transformMovieObj } from 'services/filmbase.service'
import { addSearchedMovie } from 'services/db.service'

export const menuSearchResult = new Menu<MyContext>('searchResult-menu')

menuSearchResult.dynamic(async (ctx) => {
	const range = new MenuRange<MyContext>()

	ctx.session.searchList.forEach(({ name, year, id, type }) => {
		const searchItemTitle = `${
			['film', 'cartoon', 'anime'].includes(type) ? '🍿' : '📺'
		} ${name} (${year}, ${movieTypeNamesInSearch[type].toLowerCase()})`
		range
			.text({ text: searchItemTitle, payload: String(id) }, async (ctx) => {
				const movie = transformMovieObj(await getMovieInfoById(id))

				ctx.session.searchedMovieData = movie
				ctx.menu.nav('movieItem-menu')
				handleNewMovie(ctx)

				await addSearchedMovie(ctx, movie)
			})
			.row()
	})

	return range
})

menuSearchResult
	.text(Config.get('button.goBackToSearch'), (ctx) => {
		navToMenuSection(ctx, 'search')
	})
	.text(Config.get('button.goBackToMenu'), (ctx) => {
		navToMenuSection(ctx, 'home')
	})
