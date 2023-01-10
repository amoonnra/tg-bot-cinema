import { Menu } from '@grammyjs/menu'
import { MyContext } from 'types'
import { navToMenuSection } from 'menu/utils'
import { isInclinedTypeName, MovieType, movieTypeNames } from 'types'
import { menuSectionConfig } from './menuConfig'

const menu = new Menu<MyContext>('search' + '-menu')

menuSectionConfig.forEach(({ type, isRow }) => {
	const typeName = movieTypeNames[type]
	const pluralTypeName = typeName + (isInclinedTypeName(typeName) ? 'ы' : '')

	menu.text(pluralTypeName, async (ctx) => {
		ctx.session.searchType = type

		const inclinedTypeName = typeName + (isInclinedTypeName(typeName) ? 'a' : '')

		await navToMenuSection(ctx, 'inSearch', {
			caption: `Введите название ${inclinedTypeName.toLocaleLowerCase()}`,
			photo: 'search',
		})
	})

	if (isRow) menu.row()
})

menu.back('Назад', async (ctx) => await navToMenuSection(ctx, 'home'))

export default menu
