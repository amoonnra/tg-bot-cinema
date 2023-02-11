import { Menu, MenuRange } from '@grammyjs/menu'
import { Collection, MenuRoute, MyContext } from 'types'
import { goToMovieSlider } from 'menu/utils'
import { navToMenuSection } from 'menu/utils/navToMenuSection'
import Config from 'conf'
import fs from 'fs/promises'

export const menuGenresFilms = new Menu<MyContext>('genresFilms-menu')
export const menuGenresSerials = new Menu<MyContext>('genresSerials-menu')
export const menuGenresWrapper = new Menu<MyContext>('genresWrapper-menu')

menuGenresWrapper
	.text(
		'Сериалы',
		async (ctx) =>
			await navToMenuSection(ctx, 'genresSerials')
	)
	.text(
		'Фильмы',
		async (ctx) =>
			await navToMenuSection(ctx, 'genresFilms')
	)
	.row()
	.text(Config.get('button.goBack'), async (ctx) => await navToMenuSection(ctx, 'home'))

for (let genreType of [menuGenresFilms, menuGenresSerials]) {
	///
	genreType.dynamic(async (ctx) => {
		const range = new MenuRange<MyContext>()

		const genresList: Collection[] = JSON.parse(
			await fs.readFile(`db/content/genres/allGenres.json`, 'utf-8')
		)
		const pages = Math.ceil(genresList.length / 10)
		const currentPage = ctx.session.backTo.backIndex

		genresList
			.slice(ctx.session.backTo.backIndex * 10, (ctx.session.backTo.backIndex + 1) * 10)
			.forEach(({ id, name }, index) => {
				range.submenu(name, 'movieItem-menu', (ctx) =>
					goToMovieSlider(
						ctx,
						('genres/' +
							(genreType === menuGenresFilms ? 'films' : 'serials')) as MenuRoute,
						id
					)
				)
				if (index % 2 !== 0) range.row()
			})

		if (currentPage > 0) {
			range.text(Config.get('button.prevPage'), async (ctx) => {
				ctx.session.backTo.backIndex -= 1
				ctx.menu.update()
			})
		}

		range.text(`${currentPage + 1}/${pages}`)

		if (currentPage < pages - 1) {
			range
				.text(Config.get('button.nextPage'), async (ctx) => {
					ctx.session.backTo.backIndex += 1
					ctx.menu.update()
				})
				.row()
		} else range.row()

		range.text(
			Config.get('button.goBackToMainMenu'),
			async (ctx) => await navToMenuSection(ctx, 'home')
		)

		return range
	})

	///
}
