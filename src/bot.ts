import { Bot} from 'grammy'
import { MyContext, SessionData } from 'types'
import { session } from 'grammy'
import rootMenu from 'menu'
import { handleSearch } from 'handlers/handleSearch'
import { handleStart } from 'handlers/handleStart'
import { handleErrorRequest } from 'handlers/handleErrorRequest'

// Init bot
const bot = new Bot<MyContext>(process.env.TG_TOKEN as string)


// Middlewares
bot.use(
	session({
		initial: (): SessionData => ({ listIndex: 0, moviesList: [], searchType: null }),
	})
)
bot.use(rootMenu)

// Handlers
bot.command('start', handleStart)

bot.on(':text', async (ctx) => {
	if (ctx.session?.searchType) handleSearch(ctx)
	else handleErrorRequest(ctx)
})


//
export default bot
