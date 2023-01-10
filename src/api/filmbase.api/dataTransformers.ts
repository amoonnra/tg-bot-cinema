import { Movie, MovieFromApi } from "types"

export const transformMovieObj = (data: MovieFromApi): Movie => ({
	id: data.id,
	type: data.type,
	name: data.name,
	nameEng: data.name_eng,
	age: data.age,
	poster: data.poster,
	year: data.year,
	imdbId: data.imdb_id,
	kpId: data.kinopoisk_id,
	imdbRating: data.imdb,
	kpRating: data.kinopoisk,
	time: data.time,
	quality: data.quality,
	genre: Object.values(data.genre).join(', '),
	country: Object.values(data.country).join(', '),
	lastSeason: data?.seasons?.length,
	lastEpisode: data.seasons && data.seasons.pop()?.episodes.length,
})

export const clearDubles = (movieList: Movie[]): Movie[] => {
	const idList = new Set()

	return movieList.reduce((acc: Movie[], movie) => {
		if (idList.has(movie.id)) return acc

		idList.add(movie.id)
		return [...acc, movie]
	}, [])
}
