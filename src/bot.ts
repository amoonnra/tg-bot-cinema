import rootMenu from 'menu'
import { Bot } from 'grammy'
import { session } from 'grammy'
import { MyContext, SessionData } from 'types'
import { handleSearch } from 'handlers/handleSearch'
import { handleStart } from 'handlers/handleStart'
import { handleErrorRequest } from 'handlers/handleErrorRequest'

// Init bot
const bot = new Bot<MyContext>(process.env.TG_TOKEN as string)

export const initial = (): SessionData => ({
	listIndex: 0,
	moviesList: [],
	searchType: null,
	searchList: [],
	searchedMovieData: null,
	userBookmarks: [],
})

// Middlewares
bot.use(session({ initial }))
bot.use(rootMenu)

// Handlers
bot.command('start', handleStart)

bot.on(':text', async (ctx) => {
	if (ctx.msg.text.startsWith('/') && ctx.msg.text !== '/start') handleErrorRequest(ctx)
	else handleSearch(ctx)
})

//
export default bot
