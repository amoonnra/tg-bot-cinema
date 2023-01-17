import { InputFile } from 'grammy'
import { MyContext } from 'types'
import rootMenu from 'menu'
import Config from 'conf'
import { createUser, getBookmarks } from 'services/db.service'

export const handleStart = async (ctx: MyContext) => {
	await ctx.replyWithPhoto(new InputFile('images/start.png'), {
		reply_markup: rootMenu,
		caption: Config.get('message.start'),
		parse_mode: 'HTML',
	})

	await createUser(ctx)
	ctx.session.userBookmarks = await getBookmarks(ctx)
}
