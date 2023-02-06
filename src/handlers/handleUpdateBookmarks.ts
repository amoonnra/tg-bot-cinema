import { InputFile } from 'grammy'
import { menuCaptions } from 'menu/utils'
import { MyContext } from 'types'
import rootMenu from 'menu'

export const handleUpdateBookmarks = async (ctx: MyContext) => {
	await ctx.replyWithPhoto(new InputFile('images/home.png'), {
		caption: menuCaptions.home,
		reply_markup: rootMenu,
		parse_mode: 'HTML',
	})
	return await ctx.answerCallbackQuery()
}
