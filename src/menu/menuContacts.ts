import Config from 'conf'
import { Menu } from '@grammyjs/menu'
import { MyContext } from 'types'
import { navToMenuSection } from './utils'

export const menuContacts = new Menu<MyContext>('contacts-menu', { autoAnswer: false })
	.url('Поддержка', Config.get('url.support'))
	.url('Наш канал', Config.get('url.ourChannel'))
	.row()
	.text(Config.get('button.goBackToMainMenu'), (ctx) => navToMenuSection(ctx, 'home'))
