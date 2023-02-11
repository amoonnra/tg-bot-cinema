import { Menu } from '@grammyjs/menu'
import { MenuRouteConfig, MyContext } from 'types'
import { menuAbout } from './menuAbout'
import { menuBookmarks } from './menuBookmarks'
import { menuCollections } from './menuCollections'
import { menuContacts } from './menuContacts'
import { menuGenresFilms, menuGenresSerials, menuGenresWrapper } from './menuGenres'
import { menuMovieItem } from './menuMovieItem'
import { menuPopular } from './menuPopular'
import { menuPremiers } from './menuPremiers'
import { menuSearchEnter, menuSearch, menuSearchResult } from './menuSearch'
import { menuUnknownRequest } from './menuUnknownRequest'
import { navToMenuSection } from './utils'

const menuHome = new Menu<MyContext>('home-menu')

// Routes config
const menuRoutesConfig: MenuRouteConfig[] = [
	{ name: '🆕 Новинки', sectionType: 'premiers' },
	{ name: '🚀 Популярное', sectionType: 'popular', isRow: true },
	{ name: '🎭 Подборки', sectionType: 'collections' },
	{ name: '🔮 По жанрам', sectionType: 'genresWrapper', isRow: true },
	{ name: '🔎 Поиск', sectionType: 'search' },
	{ name: '⭐ Мои закладки', sectionType: 'bookmarks', isRow: true },
	{ name: '💡 О боте', sectionType: 'about' },
	{ name: '✉️ Контакты', sectionType: 'contacts' },
]

// Append submenus
menuRoutesConfig.forEach(({ name, sectionType, isRow }) => {
	menuHome.text(name, async (ctx) => await navToMenuSection(ctx, sectionType))

	if (isRow) menuHome.row()
})

// Main routes
menuHome.register([
	menuPremiers,
	menuPopular,
	menuCollections,
	menuAbout,
	menuContacts,
	menuSearch,
	menuBookmarks,
	menuGenresWrapper,
])

// Minor routs
menuHome.register([
	menuMovieItem,
	menuSearchEnter,
	menuSearchResult,
	menuUnknownRequest,
	menuGenresFilms,
	menuGenresSerials,
])

//
export default menuHome
