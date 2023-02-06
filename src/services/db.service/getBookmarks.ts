import { MyContext } from 'types'
import { getUserData } from './getUserInfo'

export const getBookmarks = async (ctx: MyContext) => {
	const { id } = ctx.from!
	const userData = await getUserData(id)

	return userData?.bookmarks || []
}
