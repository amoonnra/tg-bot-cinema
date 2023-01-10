import { Menu } from '@grammyjs/menu'
import { MyContext } from 'types'
import { isInclinedTypeName, MenuSectionConfig, movieTypeNames } from 'types'
import { goToMovieSlider } from './goToMovieSlider'
import { navToMenuSection } from './navToMenuSection'

export function createSubmenuRouter(
	menuSection: string,
	menuSectionConfig: MenuSectionConfig[]
) {
	const menu = new Menu<MyContext>(menuSection + '-menu')

	menuSectionConfig.forEach(({ type, isRow }) => {
		const typeName = movieTypeNames[type]
		const pluralTypeName = typeName + (isInclinedTypeName(typeName) ? 'ы' : '')

		menu.text(pluralTypeName, async (ctx) => {
			ctx.menu.nav('movieItem-menu')
			await goToMovieSlider(ctx, menuSection, type)
		})

		if (isRow) menu.row()
	})

	menu.back('Назад', async (ctx) => await navToMenuSection(ctx, 'home'))

	return menu
}
