import { InputFile } from 'grammy'
import { MenuFlavor } from '@grammyjs/menu'
import { MyContext } from 'types'
import { MenuRoute } from 'types'
import { menuCaptions } from './menuCaptions'
import { goToMovieSlider } from './goToMovieSlider'
import { getBookmarks } from 'services/db.service'

interface OptionalParams {
	photo?: string
	caption?: string
}

export const navToMenuSection = async (
	ctx: MyContext & MenuFlavor,
	route: MenuRoute,
	optional?: OptionalParams
) => {
	if (route === 'bookmarks') {
		if (!ctx.session.userBookmarks.length) {
			ctx.session.userBookmarks = await getBookmarks(ctx)
		}
		if (ctx.session.userBookmarks.length) {
			ctx.menu.nav('movieItem-menu')
			await goToMovieSlider(ctx, route)
		}
	} else {
		ctx.menu.nav(route + '-menu')
		await ctx.editMessageMedia({
			type: 'photo',
			media: new InputFile(`images/${optional?.photo || route}.png`),
			caption: optional?.caption || menuCaptions[route],
			parse_mode: 'HTML',
		})
	}

	if (route === 'home' || route === 'search') {
		ctx.session.listIndex = 0
		ctx.session.moviesList = []
		ctx.session.searchList = []
		ctx.session.searchType = null
		ctx.session.searchedMovieData = null
	}
}
