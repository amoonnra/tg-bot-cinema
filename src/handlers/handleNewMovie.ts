import { MyContext } from 'types'

export function handleNewMovie(ctx: MyContext) {
	const listIndex = ctx.session.listIndex
	const moviesList = ctx.session.moviesList
	const data = moviesList[listIndex]
	const caption = `🍿  <u><b>${data.name}</b></u>  (${data.year})
${
	data.nameEng
		? data.nameEng?.length < 16
			? `<i>– Ориг. название:</i>  <b>${data.nameEng}</b>`
			: `<i>${data.nameEng}</i>\n`
		: ''
}${
		data.lastSeason
			? `\n<i>– Вышла:</i>  <b>${data.lastEpisode} серия ${data.lastSeason} сезона</b>\n`
			: '\n'
	}<i>– Рейтинг:</i>  <b><i>КП:</i> ${data.kpRating} | <i>IMDb:</i> ${data.imdbRating}</b>
<i>– Страна:</i>  <b>${data.country}</b> ${
		!data.lastSeason ? `\n<i>– Качество:</i>  <b>${data.quality}</b>` : ''
	}
<i>– Прод-сть:</i>  <b>${data.time}</b>
<i>– Жанр:</i>  <b>${data.genre}</b>
	`
	try {
		ctx.editMessageMedia({
			type: 'photo',
			media: data.poster || '',
			caption: caption,
			parse_mode: 'HTML',
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
