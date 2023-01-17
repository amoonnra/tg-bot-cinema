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

export type MovieType = FilmsType | SeriesType

export const pluralTypeName = new Proxy(movieTypeNames, {
	get(target, prop: MovieType) {
		const value = target[prop]

		if (value === 'Анимэ' || value === 'ТВ-шоу') return value
		return value + 'ы'
	},
})

export const inclinedTypeName = new Proxy(movieTypeNames, {
	get(target, prop: MovieType) {
		const value = target[prop]

		if (value === 'Анимэ' || value === 'ТВ-шоу') return value
		return value + 'а'
	},
})

export type MovieTypeName =
	| 'Анимэ'
	| 'Анимэ-сериал'
	| 'Мультфильм'
	| 'Мультсериал'
	| 'Фильм'
	| 'Сериал'
	| 'ТВ-шоу'

export function isSeriesType(type: string): type is SeriesType {
	return seriesTypes.indexOf(type as SeriesType) != -1
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
