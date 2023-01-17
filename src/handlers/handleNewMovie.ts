import { InputFile } from 'grammy'
import { MyContext } from 'types'
import { logg, transformMovieCaption } from 'utils'

export async function handleNewMovie(ctx: MyContext) {
	const listIndex = ctx.session.listIndex
	const moviesList = ctx.session.moviesList
	const data = moviesList[listIndex] || ctx.session.searchedMovieData

	if (!data) return
	const caption = transformMovieCaption(data)

	try {
		await ctx.editMessageMedia({
			type: 'photo',
			media: data.poster || new InputFile('images/noPoster.png'),
			caption: caption,
			parse_mode: 'HTML',
		})
	} catch (error) {
		await ctx.editMessageMedia({
			type: 'photo',
			media: new InputFile('images/noPoster.png'),
			caption: caption,
			parse_mode: 'HTML',
		})

		await logg(error)
	}
}
