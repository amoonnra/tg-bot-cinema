import { InputFile } from 'grammy'
import { MyContext } from 'types'
import { menuUnknownRequest } from 'menu/menuUnknownRequest'
import Config from 'conf'

export const handleErrorRequest = async (ctx: MyContext) => {
	ctx.replyWithPhoto(new InputFile('images/error.png'), {
		caption: Config.get('message.errorRequest'),
		reply_markup: menuUnknownRequest,
		parse_mode: 'HTML',
	})
}
