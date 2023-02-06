import { Movie, MovieType } from './movie'

export interface SearchQuery {
	date: Date
	type: MovieType | null
	text: string
	isSuccess: boolean
	runTime: number
	userID?: number
	userName?: string
}

export interface LocalUser {
	id: number
	firstName: string
	registerDate: Date
	lastDate: Date
	searhed: Pick<Movie, 'name' | 'nameEng' | 'year' | 'id' | 'imdbId' | 'kpId'>[]
	bookmarks: Movie[]
	language?: string
	lastName?: string
	userName?: string
}
