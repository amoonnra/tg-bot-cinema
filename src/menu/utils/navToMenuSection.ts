import path from 'path'
import { InputFile } from 'grammy'
import { MenuFlavor } from '@grammyjs/menu'
import { MyContext } from 'types'
import { MenuRoute } from 'types'

interface OptionalParams {
	photo?: string
	caption?: string
}

export const navToMenuSection = async (
	ctx: MyContext & MenuFlavor,
	route: MenuRoute,
	optional?: OptionalParams
) => {
	const photo = optional?.photo || route
	const caption = optional?.caption || ''

	ctx.menu.nav(route + '-menu')

	await ctx.editMessageMedia({
		type: 'photo',
		media: new InputFile(path.join('images', photo + '.png')),
		caption: caption,
		parse_mode: 'HTML',
	})
}
