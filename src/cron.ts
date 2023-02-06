import { updateBookmarks } from 'services/db.service'
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

const updateBookmarksCron = new CronJob(
	'0 2 11 * * *',
	async function () {
		try {
			const start = Date.now()
			await logg('Начали запланированное обновление закладок всех пользователей.')
			await updateBookmarks()
			await logg('Все прошло хорошо! ')
			await logg('Операция заняла ' + ((Date.now() - start) / 60000).toFixed(2) + ' мин.')
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
