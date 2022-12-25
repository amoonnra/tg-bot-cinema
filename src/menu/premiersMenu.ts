import { Menu, MenuRange } from '@grammyjs/menu'

type InfoFilmList = Array<{
	title: string
	description: string
}>

const filmsContent: InfoFilmList = [
	{ title: 'some titel---------------', description: 'descr' },
	{ title: 'some titel2---------------', description: 'descr2' },
	{ title: 'some titel22---------------', description: 'descr22' },
]
let indexFilm = 0

export const premiersMenu = new Menu('premiers-menu')
	.submenu('Фильмы', 'films', (ctx) => {
		console.dir(ctx.menu.nav)
		ctx.editMessageMedia({
			type: 'photo',
			media: 'http://dinoserial.com/uploads/posts/2022-11/l9rdp5tst7wcvzbvtupanqi4mmy.webp',
			caption: 'sdffsd',
		})
	})
	.submenu('Сериалы', 'serials', (ctx) => ctx.editMessageText('ыериал'))
	.submenu('ТВ-шоу', 'tv-shows', (ctx) => ctx.editMessageText('твшоу'))
	.row()
	.back('Назад')

const films = new Menu('films')
	.text('watch online')
	.row()
	.text('bookmarks')
	.row()
	.dynamic(async () => {
		const range = new MenuRange()

		if (indexFilm > 0) {
			range.text({ text: '<' }, (ctx) => {
				indexFilm--
				// ctx.editMessageText(String(indexFilm))
				ctx.menu.update()
			})
		}

		range.text(`${indexFilm + 1}/${filmsContent.length}`)

		if (indexFilm < filmsContent.length - 1) {
			range.text('>', (ctx) => {
				indexFilm++
				console.dir(ctx)
				// ctx.editMessageText(String(indexFilm))
				ctx.menu.update()
			})
		}
		return range
	})
	.row()
	.text('Назад', (ctx) => {
		ctx.menu.nav('root-menu')
		ctx.editMessageMedia({
			type: 'photo',
			media: 'http://dinoserial.com/uploads/posts/2022-12/4krcpwb6ynbr8chg5quigrrufcd.webp',
			caption: 'sdffsd',
		})
	})

premiersMenu.register(films)
