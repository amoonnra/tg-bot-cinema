import { MyContext } from 'types'
import { InputFile } from 'grammy'
import { menuInSearch } from 'menu/menuInSearch'

export const handleSearch = async (ctx: MyContext) => {
	const { text } = ctx.msg!

	ctx.replyWithPhoto(new InputFile('images/tmp.webp'), {
		caption: 'Нет такого фильма ' + text,
		reply_markup: menuInSearch,
	})

	ctx.session.searchType = null
}
