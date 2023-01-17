import { Movie } from 'types'

export const transformMovieCaption = (data: Movie) => {
	const strName = `${
		['film', 'cartoon', 'anime'].includes(data.type) ? '🍿' : '📺'
	}  <u><b>${data.name}</b></u>  (${data.year})\n\n`

	const strNameOrig = data.nameEng
		? data.nameEng?.length < 16
			? `<i>– Ориг. название:</i>  <b>${data.nameEng}</b>\n`
			: `<i>${data.nameEng}</i>\n\n`
		: ''

	const strEpisode = data.lastSeason
		? `<i>– Вышла:</i>  <b>${data.lastEpisode} серия ${data.lastSeason} сезона</b>\n`
		: ''

	const strRating = `<i>– Рейтинг:</i>  <b><i>КП:</i> ${data.kpRating} | <i>IMDb:</i> ${data.imdbRating}</b>\n`

	const strCountry = `<i>– Страна:</i>  <b>${data.country}</b>\n`

	const strQuality = !data.lastSeason
		? `<i>– Качество:</i>  <b>${data.quality}</b>\n`
		: ''

	const strTime = `<i>– Прод-сть:</i>  <b>${data.time}</b>\n`

	const strGenre = `<i>– Жанр:</i>  <b>${data.genre}</b>`

	return (
		strName +
		strNameOrig +
		strEpisode +
		strRating +
		strCountry +
		strQuality +
		strTime +
		strGenre
	)
}
