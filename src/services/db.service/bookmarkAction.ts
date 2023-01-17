import Config from 'conf'
import fs from 'fs/promises'
import { Movie, MyContext } from 'types'
import { logg } from 'utils'
import { getUserData, getUserName } from './getUserInfo'

export const bookmarkAction = async (
	action: 'add' | 'remove',
	ctx: MyContext,
	movie: Movie
) => {
	const userName = getUserName(ctx)
	const userData = await getUserData(userName)

	try {
		if (action === 'add') {
			userData.bookmarks.unshift(movie)
		} else {
			userData.bookmarks = userData.bookmarks.filter(({ id }) => movie.id !== id)
		}

		await fs.writeFile(`db/users/${userName}.json`, JSON.stringify(userData, null, 2))
		ctx.session.userBookmarks = userData.bookmarks

		await ctx.answerCallbackQuery({
			text: Config.get(
				action === 'add' ? 'message.bookmarkAdded' : 'message.bookmarkRemoved'
			),
			show_alert: true,
		})
	} catch (error) {
		await logg(error)
	}
}
