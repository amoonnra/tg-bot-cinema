import { Menu, MenuRange } from '@grammyjs/menu'
import { MyContext } from 'types'
import { handleNewMovie } from 'handlers'
import { navToMenuSection } from './utils'

export const menuMovieItem = new Menu<MyContext>('movieItem-menu')
	.text('Смотреть онлайн')
	.row()
	.text('Добавить в закладки')
	.row()
	.dynamic((ctx) => {
		const range = new MenuRange<MyContext>()
		if (!ctx.session.moviesList.length) return range

		if (ctx.session.listIndex > 0) {
			range.text('<', (ctx) => {
				ctx.session.listIndex--
				handleNewMovie(ctx)
			})
		}

		range.text(`${ctx.session.listIndex + 1}/${ctx.session.moviesList.length}`)

		if (ctx.session.listIndex < ctx.session.moviesList.length - 1) {
			range.text('>', (ctx) => {
				ctx.session.listIndex++
				handleNewMovie(ctx)
			})
		}
		return range
	})
	.row()
	.text('Назад', async (ctx) => {
		navToMenuSection(ctx, 'home')
	})
