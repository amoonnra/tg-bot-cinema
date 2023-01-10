import { InputFile } from "grammy"
import { MyContext } from "types"
import rootMenu from "menu"

export const handleStart = async (ctx: MyContext) => {
	await ctx.replyWithPhoto(new InputFile('images/home.png'), {
		reply_markup: rootMenu,
		caption: 'Главное меню',
	})
}