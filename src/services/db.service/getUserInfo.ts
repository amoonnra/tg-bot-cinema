import fs from 'fs/promises'
import { LocalUser, MyContext } from 'types'
import { logg } from 'utils'

export const getUserName = (ctx: MyContext) => {
	const { last_name, first_name, username, id } = ctx.from!
	return username || last_name ? first_name + '_' + last_name : first_name || String(id)
}

export const getUserData = async (userName: string) => {
	const userData: LocalUser = JSON.parse(
		await fs.readFile(`db/users/${userName}.json`, 'utf8')
	)

	return userData
}
