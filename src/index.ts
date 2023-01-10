import * as dotenv from 'dotenv'
dotenv.config({ path: '.env' })

import { Collection } from 'types'
import fs from 'fs/promises'
import path from 'path'
import bot from 'bot'
export let collectionList: Collection[] = []

async function appRun() {
	collectionList = JSON.parse(
		await fs.readFile(path.join('db', 'collections', `allCollections.json`), 'utf-8')
	)

	console.log('start')

	bot.catch((error) => {
		console.log(error.message)
		bot.start()
	})

	bot.start()
}

appRun()
