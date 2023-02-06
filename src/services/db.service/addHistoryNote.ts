import { SearchQuery } from 'types/user'
import { MyContext } from 'types'
import { logg } from 'utils'
import { getUserName } from './getUserInfo'
import { HistoryNote } from 'db/models/searchHistory'

export const addHistoryNote = async (ctx: MyContext, searchQuery: SearchQuery) => {
	const { id } = ctx.from!
	const userName = getUserName(ctx)

	searchQuery.userID = id
	searchQuery.userName = userName

	try {
		const historyNote = new HistoryNote(searchQuery)
		historyNote.save(async function (err) {
			if (err) await logg('Create history note Error')
		})
	} catch (error) {
		await logg(error)
	}
}
