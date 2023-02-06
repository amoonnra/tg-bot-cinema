import { User } from 'db/models/user'
import { MyContext } from 'types'
import { logg } from 'utils'

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

export const getUserData = async (id: number) => {
	try {
		return await User.findOne({ id })
	} catch (error) {
		await logg('Getting User Data Error' + error)
		return
	}
}
