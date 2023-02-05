import fs from 'fs/promises'
import { LocalUser, MyContext } from 'types'

export const getUserName = (ctx: MyContext) => {
	const { last_name, first_name, username, id } = ctx.from!
	if (username) {
		return username
	} else if (first_name) {
		if (last_name) return first_name + '_' + last_name
		return first_name
	} else {
		return String(id)
	}
}

export const getUserData = async (userName: string) => {
	const userData: LocalUser = JSON.parse(
		await fs.readFile(`db/users/${userName}.json`, 'utf8')
	)

	return userData
}
