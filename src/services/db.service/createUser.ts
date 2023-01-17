import { LocalUser } from 'types/user'
import fs from 'fs/promises'
import fsSync from 'fs'
import { MyContext } from 'types'
import { getUserName } from './getUserInfo'
import { logg } from 'utils'

export const createUser = async (ctx: MyContext) => {
	const { id, first_name, last_name, username, language_code } = ctx.from!
	const userName = getUserName(ctx)

	if (!fsSync.existsSync(`db/users/${userName}.json`)) {
		const localUser: LocalUser = {
			id: id,
			firstName: first_name,
			lastName: last_name,
			username: username,
			language: language_code,
			registerDate: new Date(),
			lastDate: new Date(),
			searhed: [],
			searchHistory: [],
			bookmarks: [],
		}

		await fs.writeFile(`db/users/${userName}.json`, JSON.stringify(localUser))
		await logg('Был создан новый пользователь: ' + userName)
	}
}
