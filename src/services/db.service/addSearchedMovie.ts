import fs from 'fs/promises'
import { Movie, MyContext } from 'types'
import { logg } from 'utils'
import { getUserData, getUserName } from './getUserInfo'

export const addSearchedMovie = async (
	ctx: MyContext,
	{ name, nameEng, year, id, kpId, imdbId }: Movie
) => {
	const userName = getUserName(ctx)
	const userData = await getUserData(userName)

	if (userData.searhed.findIndex((movie) => movie.id === id) > -1) return

	try {
		userData.searhed.unshift({ name, nameEng, year, id, kpId, imdbId })
		await fs.writeFile(`db/users/${userName}.json`, JSON.stringify(userData, null, 2))
	} catch (error) {
		await logg(error)
	}
}
