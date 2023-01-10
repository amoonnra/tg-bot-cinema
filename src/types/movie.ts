type StrNull = string | null
type FilmId = number

const filmsTypes = ['films', 'cartoon', 'anime'] as const
type FilmsType = typeof filmsTypes[number]

const seriesTypes = ['serials', 'cartoon-serials', 'anime-serials', 'show'] as const
type SeriesType = typeof seriesTypes[number]

export const movieTypeNames: { [key in MovieType]: MovieTypeName } = {
	anime: 'Анимэ',
	'anime-serials': 'Анимэ-сериал',
	cartoon: 'Мультфильм',
	'cartoon-serials': 'Мультсериал',
	films: 'Фильм',
	serials: 'Сериал',
	show: 'ТВ-шоу',
}

export type MovieTypeName =
	| 'Анимэ'
	| 'Анимэ-сериал'
	| 'Мультфильм'
	| 'Мультсериал'
	| 'Фильм'
	| 'Сериал'
	| 'ТВ-шоу'

export const isInclinedTypeName = (name: MovieTypeName) => name !== 'Анимэ' && name !== 'ТВ-шоу'

export function isSeriesType(type: string): type is SeriesType {
	return seriesTypes.indexOf(type as SeriesType) != -1
}

export type MovieType = FilmsType | SeriesType

export type FilmbaseResponse = {
	total: number
	results: { id: FilmId }[]
}

export interface MovieFromApi {
	id: FilmId
	type: string
	name: string
	name_eng: StrNull
	age: StrNull
	poster: StrNull
	year: number
	imdb_id: StrNull
	kinopoisk_id: StrNull
	imdb: StrNull
	kinopoisk: StrNull
	time: StrNull
	quality: string
	genre: { [key: number]: string }
	country: { [key: number]: string }
	seasons?: { episodes: any[] }[]
}

export interface Movie {
	id: FilmId
	type: string
	name: string
	nameEng: StrNull
	age: StrNull
	poster: StrNull
	year: number
	imdbId: StrNull
	kpId: StrNull
	imdbRating: StrNull
	kpRating: StrNull
	time: StrNull
	quality: string
	genre: string
	country: string
	lastEpisode?: number
	lastSeason?: number
}

export type Collection = {
	id: number
	name: string
}
