import { LocalUser } from 'types/user'
import { MyContext } from 'types'
import { logg } from 'utils'
import { User } from 'db/models/user'
import { getUserName } from './getUserInfo'

export const createUser = async (ctx: MyContext) => {
	const { id, first_name, last_name, username, language_code } = ctx.from!
	if (!(await User.findOne({ id }))) {
		const localUser: LocalUser = {
			id: id,
			firstName: first_name,
			lastName: last_name,
			userName: username,
			language: language_code,
			registerDate: new Date(),
			lastDate: new Date(),
			searhed: [],
			bookmarks: [],
		}

		const user = new User(localUser)
		user.save(function (err) {
			if (err) logg('Create user Error')
			logg(
				'Был создан новый пользователь: ' + getUserName(ctx)
			)
		})
	}
}
