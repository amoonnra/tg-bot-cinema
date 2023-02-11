import { FileFlavor } from '@grammyjs/files'
import { MenuFlavor } from '@grammyjs/menu'
import { Context, SessionFlavor } from 'grammy'
import { FilmbaseResponseItem } from './fromApi'
import { MenuRoute } from './menu'
import { Movie, MovieType } from './movie'

export * from './movie'
export * from './menu'
export * from './fromApi'
export * from './user'

export interface SessionData {
	listIndex: number
	moviesList: Movie[]
	searchType: MovieType | null
	searchList: FilmbaseResponseItem[]
	searchedMovieData: Movie | null,
	userBookmarks: Movie[]
	backTo: {route: MenuRoute | null, backIndex: number}
}

export type MyContext =  FileFlavor<Context> & SessionFlavor<SessionData>
