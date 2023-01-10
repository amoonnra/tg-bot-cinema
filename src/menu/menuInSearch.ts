import { Menu } from '@grammyjs/menu'
import { MyContext } from 'types'
import { navToMenuSection } from './utils'

export const menuInSearch = new Menu<MyContext>('inSearch-menu')
	.text('Назад', (ctx) => {
		navToMenuSection(ctx, 'search')
	})
	.text('Главное меню', (ctx) => navToMenuSection(ctx, 'home'))
