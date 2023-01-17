import fs from 'fs/promises'
import fsSync from 'fs'
import { SearchQuery } from 'types/user'
import { MyContext } from 'types'
import { getUserName } from './getUserInfo'
import { logg } from 'utils'

export const addHistoryNote = async (ctx: MyContext, searchQuery: SearchQuery) => {
	const { id } = ctx.from!
	const userName = getUserName(ctx)

	const day = new Date().getDate()
	const month = new Date().getMonth() + 1
	const year = new Date().getFullYear()

	searchQuery.userID = id
	searchQuery.userName = userName

	const dirPath = `db/searchHistory/${month < 10 ? '0' + month : month}_${year}`
	const filePath = dirPath + `/${day}.json`

	try {
		if (!fsSync.existsSync(dirPath)) {
			await fs.mkdir(dirPath, { recursive: true })
		}

		fsSync.readFile(filePath, 'utf-8', async (err, data) => {
			if (!err && data) {
				await fs.writeFile(
					filePath,
					JSON.stringify([searchQuery, ...JSON.parse(data)], null, 2)
				)
			} else {
				await fs.writeFile(filePath, JSON.stringify([searchQuery], null, 2))
			}
		})
	} catch (error) {
		await logg(error)
	}
}
