import { MyContext } from 'types'
import { getUserData, getUserName } from './getUserInfo'

export const getBookmarks = async (ctx: MyContext) => {
	const userName = getUserName(ctx)
	const userData = await getUserData(userName)

	return userData.bookmarks
}
