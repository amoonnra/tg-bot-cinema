import { MenuFlavor } from '@grammyjs/menu'
import { getBookmarks } from 'services/db.service'
import { MyContext } from 'types'
import { navToMenuSection } from './navToMenuSection'

export const onMenuOutdated = async (ctx: MyContext & MenuFlavor) => {
	await ctx.answerCallbackQuery('Меню устарело')
	await navToMenuSection(ctx, 'home')

	ctx.session.userBookmarks = await getBookmarks(ctx)
}
