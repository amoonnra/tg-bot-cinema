import { Menu } from '@grammyjs/menu'
import Config from 'conf'
import { MyContext } from 'types'
import { navToMenuSection } from '../utils'

export const menuSearchEnter = new Menu<MyContext>('searchEnter-menu')
	.text(Config.get('button.goBackToSearch'), (ctx) => {
		navToMenuSection(ctx, 'search')
	})
	.text(Config.get('button.goBackToMenu'), (ctx) => {
		navToMenuSection(ctx, 'home')
	})
