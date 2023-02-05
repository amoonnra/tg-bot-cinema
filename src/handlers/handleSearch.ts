import { InputFile } from 'grammy'
import { MyContext } from 'types'
import { Searchtext } from 'utils'
import { SearchQuery } from 'types/user'
import { menuSearchEnter, menuSearchResult } from 'menu/menuSearch'
import { findMovieByName } from 'services/filmbase.service'
import { addHistoryNote } from 'services/db.service'
import { handleErrorRequest } from './handleErrorRequest'

export const handleSearch = async (ctx: MyContext) => {
	let { text } = ctx.msg!
	let { searchType } = ctx.session

	if (!text) return

	if (/(?:\s)(фильм|film|movie)/.test(text)) {
		searchType = 'films'
		text = text.replace(/(?:\s)фильм/, '')
	}
	if (/(?:\s)(сериал|series|serial)/.test(text)) {
		searchType = 'serials'
		text = text.replace(/(?:\s)сериал/, '')
	}

	const startTime = Date.now()
	const searchList = await findMovieByName(text, searchType)
	const searchText = new Searchtext(text, searchType)
	const searchQuery: SearchQuery = {
		text,
		type: searchType,
		date: new Date(),
		runTime: Date.now() - startTime,
		isSuccess: true,
	}

	ctx.session.searchList = searchList

	if (searchList.length) {
		ctx.replyWithPhoto(new InputFile('images/searchResult.png'), {
			caption: searchText.getResultText(),
			reply_markup: menuSearchResult,
			parse_mode: 'HTML',
		})

		ctx.session.searchType = null
	} else {
		ctx.replyWithPhoto(new InputFile('images/searchError.png'), {
			caption: searchText.getFailedText(),
			reply_markup: menuSearchEnter,
			parse_mode: 'HTML',
		})

		searchQuery.isSuccess = false
	}

	await addHistoryNote(ctx, searchQuery)
}
