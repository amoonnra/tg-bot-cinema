import { Menu } from '@grammyjs/menu'
import { Message } from 'grammy/out/types.node'
import { MenuPoster } from 'types'
import { aboutMenu } from './aboutMenu'
import { collectionsMenu } from './collectionsMenu'
import { contactsMenu } from './contactsMenu'
import { popularMenu } from './popularMenu'
import { premiersMenu } from './premiersMenu'

export const homeMenu = new Menu('root-menu')
	.submenu('Премьеры', 'premiers-menu', (ctx) => {
		ctx.editMessageMedia({
			type: 'photo',
			media: 'http://dinoserial.com/uploads/posts/2022-12/n8m0tl1v2qyrlbs3hpqfjgqgtgt.webp',
			caption: 'sdfsd',
		})
		// ctx.editMessageText('sdsdsd')
	})
	.submenu('Популярное', 'popular-menu')
	.row()
	.submenu('Подборки', 'collections-menu')
	.submenu('Ваши закладки', 'bookmarks-menu')
	.row()
	.submenu('Поиск', 'search-text')
	.row()
	.submenu('О боте', 'about-menu')
	.submenu('Контакты', 'contacts-menu')
	.row()

homeMenu.register(premiersMenu)
homeMenu.register(popularMenu)
homeMenu.register(collectionsMenu)
homeMenu.register(aboutMenu)
homeMenu.register(contactsMenu)
