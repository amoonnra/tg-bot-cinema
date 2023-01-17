import {
	appendCollections,
	appendPopulars,
	appendPremiers,
} from 'services/filmbase.service/appendData'
import { logg } from 'utils'

const CronJob = require('cron').CronJob

const updatePremiersAndPopular = new CronJob(
	'0 14 6 * * *',
	async function () {
		try {
			await logg('Начали запланированное обновление популярных.')
			await appendPopulars()
			await logg('Начали запланированное обновление новинок.')
			await appendPremiers()
			await logg('Все прошло хорошо!')
		} catch (error) {
			await logg(error)
		}
	},
	null,
	true
)

const updateCollections = new CronJob(
	'0 55 6 * * WED',
	async function () {
		try {
			await logg('Начали запланированное обновление подборок.')
			await appendCollections()
			await logg('Все прошло хорошо!')
		} catch (error) {
			await logg(error)
		}
	},
	null,
	true
)
