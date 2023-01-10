import { Context, SessionFlavor } from 'grammy'
import { Movie, MovieType } from './movie'

export * from './movie'
export * from './menu'
export * from './fromApi'

export interface SessionData {
	listIndex: number
	moviesList: Movie[]
	searchType: MovieType | null
}

export type MyContext = Context & SessionFlavor<SessionData>
