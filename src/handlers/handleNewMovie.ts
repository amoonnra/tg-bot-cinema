import { InputFile } from 'grammy'
import { menuMovieItem } from 'menu/menuMovieItem'
import { MyContext } from 'types'
import { logg, transformMovieCaption } from 'utils'

export async function handleNewMovie(ctx: MyContext, reply?: boolean) {
	const listIndex = ctx.session.listIndex
	const moviesList = ctx.session.moviesList
	const data = moviesList[listIndex] || ctx.session.searchedMovieData

	if (!data) return
	const caption = transformMovieCaption(data)

	if (!reply) {
		try {
			await ctx.editMessageMedia({
				type: 'photo',
				media:
					(data.kpRating !== '—' && data.kpRating !== 'null'
						? `https://st.kp.yandex.net/images/film_iphone/iphone360_${data.kpId}.jpg`
						: data.poster) || new InputFile('images/noPoster.png'),
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
	} else {
		try {
			ctx.replyWithPhoto(
				(data.kpRating !== '—' && data.kpRating !== 'null'
					? `https://st.kp.yandex.net/images/film_iphone/iphone360_${data.kpId}.jpg`
					: data.poster) || new InputFile('images/noPoster.png'),
				{
					caption,
					parse_mode: 'HTML',
					reply_markup: menuMovieItem,
				}
			)
		} catch (error) {
			ctx.replyWithPhoto(new InputFile('images/noPoster.png'), {
				caption,
				parse_mode: 'HTML',
				reply_markup: menuMovieItem,
			})

			await logg(error)
		}
	}
}
