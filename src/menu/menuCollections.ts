import { Menu, MenuRange } from '@grammyjs/menu'
import { Collection, MyContext } from 'types'
import { goToMovieSlider } from 'menu/utils'
import { navToMenuSection } from 'menu/utils/navToMenuSection'
import Config from 'conf'
import fs from 'fs/promises'

export const menuCollections = new Menu<MyContext>('collections-menu')

menuCollections.dynamic(async (ctx) => {
	const range = new MenuRange<MyContext>()

	const collectionList: Collection[] = JSON.parse(
		await fs.readFile(`db/content/collections/allCollections.json`, 'utf-8')
	)
	const pages = Math.ceil(collectionList.length / 10)
	const currentPage = ctx.session.backTo.backIndex

	collectionList
		.slice(ctx.session.backTo.backIndex * 10, (ctx.session.backTo.backIndex + 1) * 10)
		.forEach(({ id, name }, index) => {
			range.submenu(name, 'movieItem-menu', (ctx) =>
				goToMovieSlider(ctx, 'collections', id)
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
	}

	range.text(
		Config.get('button.goBackToMenu'),
		async (ctx) => await navToMenuSection(ctx, 'home')
	)

	return range
})
