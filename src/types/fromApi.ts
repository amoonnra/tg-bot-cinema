import { MovieType } from './movie'

type StrNull = string | null
type FilmId = number

export type FilmbaseResponse = {
	total: number
	results: FilmbaseResponseItem[]
}
export interface FilmbaseResponseItem {
	id: FilmId
	name: string
	origin_name: StrNull
	year: number
	type: MovieType
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
	seasons?: { episodes: { iframe_url: string | null }[] }[]
}
