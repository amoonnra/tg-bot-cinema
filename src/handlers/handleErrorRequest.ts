import { MyContext } from 'types'
import { InputFile } from 'grammy'
import { menuUnknownRequest } from 'menu/menuUnknownRequest'

export const handleErrorRequest = async (ctx: MyContext) => {
	ctx.replyWithPhoto(new InputFile('images/tmp.webp'), {
		caption: 'Не можем понять ваш запрос',
		reply_markup: menuUnknownRequest,
	})
}
