import { Menu } from '@grammyjs/menu'
import { inclinedTypeName, MyContext, pluralTypeName } from 'types'
import { navToMenuSection } from 'menu/utils'
import { menuSectionConfig } from './menuConfig'
import Config from 'conf'

export const menuSearch = new Menu<MyContext>('search-menu')

menuSectionConfig.forEach(({ type, isRow }) => {
	menuSearch.text(pluralTypeName[type], async (ctx) => {
		ctx.session.searchType = type

		await navToMenuSection(ctx, 'searchEnter', {
			caption: `✍🏻  Введите название <b>${inclinedTypeName[
				type
			].toLowerCase()}</b>, который хотите найти`,
			photo: 'searchEnter',
		})
	})

	if (isRow) menuSearch.row()
})

menuSearch.text(
	Config.get('button.goBack'),
	async (ctx) => await navToMenuSection(ctx, 'home')
)
