import Config from 'conf'
import { Movie, MyContext } from 'types'
import { logg } from 'utils'
import { getUserData } from './getUserInfo'

export const bookmarkAction = async (
	action: 'add' | 'remove',
	ctx: MyContext,
	movie: Movie
) => {
	const { id } = ctx.from!
	const userData = await getUserData(id)
	if (!userData) return
	let bookmarks = userData.bookmarks || []

	try {
		if (action === 'add') {
			bookmarks.unshift(movie)
		} else {
			bookmarks = bookmarks.filter(({ id }) => movie.id !== id)
		}

		userData.bookmarks = bookmarks
		userData.lastDate = new Date()

		userData.save(function (err) {
			if (err) logg('Bookmark action Error')
		})

		ctx.session.userBookmarks = bookmarks

		await ctx.answerCallbackQuery({
			text: Config.get(
				action === 'add' ? 'message.bookmarkAdded' : 'message.bookmarkRemoved'
			),
		})
	} catch (error) {
		await logg(error)
	}
}
