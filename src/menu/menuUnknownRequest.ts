import { Menu } from '@grammyjs/menu'
import Config from 'conf'
import { MyContext } from 'types'
import { navToMenuSection } from './utils'

export const menuUnknownRequest = new Menu<MyContext>('unknownRequest-menu').text(
	Config.get('button.goBackToMainMenu'),
	(ctx) => navToMenuSection(ctx, 'home')
)
