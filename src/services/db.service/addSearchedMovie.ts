import { Movie, MyContext } from 'types'
import { logg } from 'utils'
import { getUserData } from './getUserInfo'

export const addSearchedMovie = async (
	ctx: MyContext,
	{ name, nameEng, year, id, kpId, imdbId }: Movie
) => {
	const userData = await getUserData(ctx.from!.id)

	if (!userData) return

	if (userData.searhed.findIndex((movie) => movie.id === id) > -1) return

	try {
		userData.searhed.unshift({ name, nameEng, year, id, kpId, imdbId })
		userData.lastDate = new Date()

		userData.save(function (err) {
			if (err) logg('Add searched movie to user history Error')
		})
	} catch (error) {
		await logg(error)
	}
}
