import { Bot } from 'grammy'
import * as dotenv from 'dotenv'
import { handleStart } from 'handlers'
dotenv.config({ path: '.env' })
import { homeMenu } from 'menu/homeMenu'

export const bot = new Bot(process.env.TG_TOKEN as string)

bot.use(homeMenu)

bot.command('start', async (ctx) => {
	// Send the menu.
	await ctx.replyWithPhoto(
		'http://dinoserial.com/uploads/posts/2022-12/1chgaory13vwy6mw50mh1qye3mb.webp',
		{
			reply_markup: homeMenu,
			caption: 'fdgddf',
		}
	)
	// await ctx.reply("Check out this menu:", { reply_markup: homeMenu })
})

// async function start() {
//    try {
//       console.log("TG_TOKEN", process.env.TG_TOKEN)
//    } catch (error) {
//       if (error instanceof Error) console.log(error)
//    }
// }
console.log('start')
bot.catch((error) => console.log(error))
bot.start()
