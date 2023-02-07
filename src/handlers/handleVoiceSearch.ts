import { MyContext } from 'types'
import { getTextFromVoice } from 'utils/getTextFromVoice'
import { handleSearch } from './handleSearch'

export const handleVoiceSearch = async (ctx: MyContext) => {
	const file = await ctx.getFile()
	const pth = await file.download('voices/input__' + file.file_id + '.ogg')

	let text = await getTextFromVoice(pth)

	if (text) {
		ctx.reply('🎙️ Идет поиск по запросу: ' + text)
		handleSearch(ctx, text)
	} else {
		ctx.reply('🔇 Ваше сообщение не распознано, попробуйте ввести название в ручную.')
	}
}
