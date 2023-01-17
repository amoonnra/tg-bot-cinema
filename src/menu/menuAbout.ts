import { Menu } from '@grammyjs/menu'
import Config from 'conf'
import { navToMenuSection } from 'menu/utils'
import { MyContext } from 'types'

export const menuAbout = new Menu<MyContext>('about-menu').text(
	Config.get('button.goBack'),
	(ctx) => navToMenuSection(ctx, 'home')
)
