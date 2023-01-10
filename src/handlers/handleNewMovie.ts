import { MyContext } from 'types'

export function handleNewMovie(ctx: MyContext) {
	const listIndex = ctx.session.listIndex
	const moviesList = ctx.session.moviesList

	try {
		ctx.editMessageMedia({
			type: 'photo',
			media: moviesList[listIndex].poster || '',
			caption: moviesList[listIndex].name,
		})
	} catch (error) {
		console.log(error)
		ctx.editMessageMedia({
			type: 'photo',
			media:
				'http://dinoserial.com/uploads/posts/2022-11/omtkydzf4nkvrqjeqzhkmifpn80.webp',
			caption: moviesList[listIndex].name,
		})
	}
}
