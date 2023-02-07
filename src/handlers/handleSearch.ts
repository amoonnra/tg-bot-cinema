import { InputFile } from 'grammy'
import { MyContext } from 'types'
import { Searchtext, transformMovieCaption } from 'utils'
import { SearchQuery } from 'types/user'
import { menuSearchEnter, menuSearchResult } from 'menu/menuSearch'
import {
	findMovieByKp,
	findMovieByName,
	getMovieInfoById,
	transformMovieObj,
} from 'services/filmbase.service'
import { addHistoryNote } from 'services/db.service'
import { handleNewMovie } from './handleNewMovie'
import { menuMovieItem } from 'menu/menuMovieItem'

export const handleSearch = async (ctx: MyContext, inputText?: string) => {
	let { text } = ctx.msg!
	let { searchType } = ctx.session
	if (inputText) text = inputText

	if (!text) return

	text = text.toLowerCase()

	if (/(?:\s|^)(фильм|film|movie)/.test(text)) {
		searchType = 'films'
		text = text.replace(/(?:\s|^)(фильм|film|movie)/, '').trim()
	}
	if (/(?:\s|^)(сериал|series|serial)/.test(text)) {
		searchType = 'serials'
		text = text.replace(/(?:\s|^)(сериал|series|serial)/, '').trim()
	}
	if (/(?:\s|^)(мультфильм|мультик|cartoon)/.test(text)) {
		searchType = 'cartoon'
		text = text.replace(/(?:\s|^)(мультфильм|мультик|cartoon)/, '').trim()
	}
	if (/(?:\s|^)мультсериал/.test(text)) {
		searchType = 'cartoon-serials'
		text = text.replace(/(?:\s|^)мультсериал/, '').trim()
	}

	if (/((?:\s)(смотреть|онлайн)|(смотреть|онлайн)(?:\s))/gm.test(text)) {
		text = text.replace(/((?:\s)(смотреть|онлайн)|(смотреть|онлайн)(?:\s))/gm, '').trim()
	}

	if (inputText)
		text = text
			.replace(' два', ' 2')
			.replace(' три', ' 3')
			.replace(' четыре', ' 4')
			.replace(' пять', ' 5')
			.replace(' шесть', ' 6')
			.replace(' семь', ' 7')
			.replace(' восемь', ' 8')
			.replace(' девять', ' 9')

	const startTime = Date.now()
	const searchQuery: SearchQuery = {
		text,
		type: searchType,
		date: new Date(),
		runTime: Date.now() - startTime,
		isSuccess: true,
	}

	const isKpQuery = text.includes('kinopoisk') && text.match(/(?!\/)(?<=\/)\d+/)?.[0]
	let searchText = new Searchtext(text, searchType)

	// Если пользователь ввел ссылку на кинопоиск

	if (isKpQuery) {
		const kpId = text.match(/(?!\/)\d+/)?.[0]
		searchText = new Searchtext(kpId!, searchType)

		const data = await findMovieByKp(Number(kpId))

		if (data) {
			// Удача

			const movie = transformMovieObj(data)
			ctx.session.searchedMovieData = movie

			await handleNewMovie(ctx, true)
		} else {
			// Неудача

			ctx.replyWithPhoto(new InputFile('images/searchError.png'), {
				caption: searchText.getFailedKpText(),
				reply_markup: menuSearchEnter,
				parse_mode: 'HTML',
			})

			searchQuery.isSuccess = false
		}

		////////////////////////////////////////////
	} else {
		//Если пользователь ввел название текстом

		const searchList = await findMovieByName(text, searchType)
		ctx.session.searchList = searchList

		if (searchList.length === 1) {
			// Удача - точное попадание

			const data = await getMovieInfoById(Number(searchList[0].id))
			const movie = transformMovieObj(data)
			ctx.session.searchedMovieData = movie

			await handleNewMovie(ctx, true)
		} else if (searchList.length > 1) {
			// Удача - выбор из списка

			ctx.replyWithPhoto(new InputFile('images/searchResult.png'), {
				caption: searchText.getResultText(),
				reply_markup: menuSearchResult,
				parse_mode: 'HTML',
			})

			ctx.session.searchType = null
		} else {
			// Неудача

			ctx.replyWithPhoto(new InputFile('images/searchError.png'), {
				caption: searchText.getFailedText(),
				reply_markup: menuSearchEnter,
				parse_mode: 'HTML',
			})

			searchQuery.isSuccess = false
		}
	}

	ctx.session.moviesList = []
	await addHistoryNote(ctx, searchQuery)
}
