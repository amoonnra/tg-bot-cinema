import * as dotenv from 'dotenv'
dotenv.config({ path: '.env' })

import bot from 'bot'
import { logg } from 'utils'

async function appRun() {
	console.log('start')

	bot.catch(async (error) => {
		await logg(error)
		bot.start()
	})

	bot.start()
}

appRun()
