import rootMenu from 'menu'
import { Bot } from 'grammy'
import { session } from 'grammy'
import { MyContext, SessionData } from 'types'
import { handleSearch } from 'handlers/handleSearch'
import { handleStart } from 'handlers/handleStart'
import { handleErrorRequest } from 'handlers/handleErrorRequest'
import { handleUpdateBookmarks } from 'handlers'
import { hydrateFiles } from '@grammyjs/files'
import { handleVoiceSearch } from 'handlers/handleVoiceSearch'
const { Wit } = require('node-wit')

// Init bot
export const wit = new Wit({ accessToken: process.env.WIT_TOKEN! })
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
bot.api.config.use(hydrateFiles(bot.token))

bot.callbackQuery('updateBookmarks', handleUpdateBookmarks)

// Handlers
bot.command('start', handleStart)

bot.on(':text', async (ctx) => {
	if (ctx.msg.text.startsWith('/') && ctx.msg.text !== '/start') handleErrorRequest(ctx)
	else handleSearch(ctx)
})

bot.on(':voice', handleVoiceSearch)

//
export default bot
