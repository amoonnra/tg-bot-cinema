import { Menu, MenuRange } from '@grammyjs/menu'
import { MyContext } from 'types'
import { handleNewMovie } from 'handlers'
import { navToMenuSection } from './utils'
import { onMenuOutdated } from './utils/onMenuOutdated'
import Config from 'conf'
import { bookmarkAction } from 'services/db.service'

export const menuMovieItem = new Menu<MyContext>('movieItem-menu', {
	autoAnswer: false,
	onMenuOutdated,
}).dynamic(async (ctx) => {
	const range = new MenuRange<MyContext>()

	const page = ctx.session.listIndex
	const allPages = ctx.session.moviesList.length
	const data = ctx.session.moviesList[page] || ctx.session.searchedMovieData

	if (!data) return range

	const isInBookmarks = ctx.session.userBookmarks.some((movie) => movie.id === data.id)

	range
		.url(Config.get('button.watch'), Config.get('url.site') + String(data?.id))
		.row()
		.text(
			Config.get(isInBookmarks ? 'button.removeFromBookmarks' : 'button.addToBookmarks'),
			async (ctx) => {
				await bookmarkAction(isInBookmarks ? 'remove' : 'add', ctx, data)
				ctx.menu.update()
			}
		)
		.row()

	if (allPages > 1) {
		if (page > 0) {
			range.text(Config.get('button.prevPage'), (ctx) => {
				ctx.session.listIndex--
				handleNewMovie(ctx)
			})
		}

		range.text(`${page + 1} / ${allPages}`)

		if (page < allPages - 1) {
			range.text(Config.get('button.nextPage'), (ctx) => {
				ctx.session.listIndex++
				handleNewMovie(ctx)
			})
		}

		range.row().text(Config.get('button.goBack'), async (ctx) => {
			navToMenuSection(ctx, 'home')
		})

		return range
	}

	range
		.text(Config.get('button.goBackToSearch'), (ctx) => {
			navToMenuSection(ctx, 'search')
		})
		.text(Config.get('button.goBackToMenu'), (ctx) => {
			navToMenuSection(ctx, 'home')
		})

	return range
})
