import { updateBookmarks } from 'services/db.service'
import {
	appendCollections,
	appendPopulars,
	appendPremiers,
} from 'services/filmbase.service/appendData'
import { appendGenres } from 'services/filmbase.service/appendData/appendGenres'
import { logg } from 'utils'

const CronJob = require('cron').CronJob

const updatePremiersAndPopular = new CronJob(
	'0 10 * * * *',
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
	'0 11 9 * * *',
	async function () {
		try {
			const start = Date.now()
			await logg('Начали запланированное обновление закладок всех пользователей.')
			await updateBookmarks()
			console.log('end')
			await logg('Все прошло хорошо! ')
			await logg('Операция заняла ' + ((Date.now() - start) / 60000).toFixed(2) + ' мин.')
			return
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

const updateGenres = new CronJob(
	'0 35 4 * * SUN',
	async function () {
		try {
			await logg('Начали запланированное обновление жанров.')
			await appendGenres()
			await logg('Все прошло хорошо!')
		} catch (error) {
			await logg(error)
		}
	},
	null,
	true
)
