import { Menu } from '@grammyjs/menu'
import { MyContext } from 'types'
import menuSearch from './menuSearch'
import { navToMenuSection } from './utils'
import { menuMovieItem } from './menuMovieItem'
import { menuUnknownRequest } from './menuUnknownRequest'
import { menuInSearch } from './menuInSearch'
import menuPopular from './menuPopular'
import menuPremiers from './menuPremiers'
import { menuCollections } from './menuCollections'
import { menuAbout } from './menuAbout'
import { menuContacts } from './menuContacts'
import { MenuRouteConfig } from 'types'

const menuHome = new Menu<MyContext>('home-menu')

const menuRoutesConfig: MenuRouteConfig[] = [
	{ name: 'Премьеры', sectionType: 'premiers' },
	{ name: 'Популярное', sectionType: 'popular', isRow: true },
	{ name: 'Подборки', sectionType: 'collections' },
	{ name: 'Ваши закладки', sectionType: 'bookmarks', isRow: true },
	{ name: 'Поиск', sectionType: 'search', isRow: true },
	{ name: 'О боте', sectionType: 'about' },
	{ name: 'Контакты', sectionType: 'contacts' },
]

menuRoutesConfig.forEach(({ name, sectionType, isRow }) => {
	menuHome.submenu(
		name,
		sectionType + '-menu',
		async (ctx) => await navToMenuSection(ctx, sectionType)
	)
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
])

// Minor routs
menuHome.register([menuMovieItem, menuInSearch, menuUnknownRequest])

//
export default menuHome
