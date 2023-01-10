import { Menu } from '@grammyjs/menu'
import { MyContext } from 'types'

export const menuContacts = new Menu<MyContext>('contacts-menu')
	// .text('Тут будут контакты', (ctx) => ctx.reply('Powered by grammY'))
	.back('Назад')
