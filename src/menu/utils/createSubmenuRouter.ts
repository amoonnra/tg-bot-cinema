import { Menu, MenuRange } from '@grammyjs/menu'
import Config from 'conf'
import { MenuRoute, MenuSectionConfig, MyContext, pluralTypeName } from 'types'
import { goToMovieSlider } from './goToMovieSlider'
import { navToMenuSection } from './navToMenuSection'

export function createSubmenuRouter(
	menuSection: MenuRoute,
	menuSectionConfig: MenuSectionConfig[]
) {
	const menu = new Menu<MyContext>(menuSection + '-menu')

	menuSectionConfig.forEach(({ type, isRow }) => {
		menu.text(pluralTypeName[type], async (ctx) => {
			ctx.menu.nav('movieItem-menu')
			await goToMovieSlider(ctx, menuSection, type)
		})

		if (isRow) menu.row()
	})

	menu.text(
		Config.get('button.goBack'),
		async (ctx) => await navToMenuSection(ctx, 'home')
	)

	return menu
}
