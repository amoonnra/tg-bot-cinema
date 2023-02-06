import * as dotenv from 'dotenv'
dotenv.config({ path: '.env' })
import mongoose from 'mongoose'
import bot from 'bot'
import { logg } from 'utils'

async function appRun() {
	console.log('start')
	try {
		mongoose.set('strictQuery', true)
		await mongoose.connect(process.env.MONGO_URI!)
		console.log('Mongodb connected')
	} catch (error) {
		console.log('DB connection error' + error)
	}
	bot.start()
	console.log('work')

	bot.catch(async (error) => {
		await logg(error)
		await bot.start()
	})
}

appRun()
