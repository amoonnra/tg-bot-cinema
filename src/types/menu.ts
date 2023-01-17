import { InputFile } from 'grammy'
import { MovieType } from './movie'

export type MenuRoute =
	| 'home'
	| 'premiers'
	| 'popular'
	| 'collections'
	| 'bookmarks'
	| 'search'
	| 'about'
	| 'contacts'
	| 'movieItem'
	| 'searchError'
	| 'unknownRequest'
	| 'searchEnter'

export interface MenuPoster {
	photo: InputFile | string
	other: { caption: string }
}

export interface MenuSectionConfig {
	type: MovieType
	isRow?: boolean
}

export interface MenuRouteConfig {
	name: string
	sectionType: MenuRoute
	isRow?: true
}
