import { Movie, MovieType } from './movie'

export interface SearchQuery {
	type: MovieType | null
	text: string
	isSuccess: boolean
	runTime: number
	date: Date
	userID?: number
	userName?: string 
}

export interface LocalUser {
	id: number
	firstName: string
	registerDate: Date
	lastDate: Date
	searhed: Pick<Movie, 'name' | 'nameEng' | 'year' | 'id' | 'imdbId' | 'kpId'>[]
	searchHistory: SearchQuery[]
	bookmarks: Movie[]
	language?: string
	lastName?: string
	username?: string
}
