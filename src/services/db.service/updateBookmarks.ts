import bot from 'bot'
import { User } from 'db/models/user'
import { getMovieInfoById, transformMovieObj } from 'services/filmbase.service'
import { InlineKeyboard, InputFile } from 'grammy'
import Config from 'conf'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env' })

export const updateBookmarks = async () => {
	try {
		mongoose.set('strictQuery', true)
		await mongoose.connect(process.env.MONGO_URI!)
		console.log('Mongodb connected')
	} catch (error) {
		console.log('DB connection error' + error)
	}
	User.find({}, null, async (err, users) => {
		if (err) return console.log(err.message)

		for (let user of users) {
			const time = Math.round(
				(Date.now() - user.lastDate.getTime()) / (1000 * 60 * 60 * 24)
			)
			if (time > 10) return

			const updates: string[] = []

			for (let bookmark of user.bookmarks) {
				const newBookmark = transformMovieObj(await getMovieInfoById(bookmark.id))

				if (bookmark.quality !== newBookmark.quality) {
					updates.push(
						`– <b>${bookmark.name}</b>. 
  Качество видео обновилось: ${bookmark.quality} 🠒 ${newBookmark.quality} / <a href="${
							Config.get('url.site') + String(newBookmark.id)
						}"><u>Смотреть</u></a>`
					)
					bookmark.quality = newBookmark.quality
				}

				if (
					bookmark?.lastEpisode &&
					(bookmark.lastEpisode !== newBookmark.lastEpisode ||
						bookmark.lastSeason !== newBookmark.lastSeason)
				) {
					updates.push(
						`– <b>${bookmark.name}</b>. 
  Вышла ${newBookmark.lastEpisode} серия ${newBookmark.lastSeason} сезона / <a href="${
							Config.get('url.site') + String(newBookmark.id)
						}"><u>Смотреть</u></a>`
					)
					bookmark.lastEpisode = newBookmark.lastEpisode
					bookmark.lastSeason = newBookmark.lastSeason
				}
			}

			await user.save()

			if (updates.length) {
				const text = `❤️‍🔥 Фильмы / сериалы в ваших закладках обновились:

${updates.join('\n\n')}

Приятного просмотра!`
				const inlineKeyboard = new InlineKeyboard().text(
					Config.get('button.goBackToMainMenu'),
					'updateBookmarks'
				)
				await bot.api.sendPhoto(user.id, new InputFile('images/bookmarksUpdate.png'), {
					caption: text,
					parse_mode: 'HTML',
					reply_markup: inlineKeyboard,
				})
			}
		}
	})
}
