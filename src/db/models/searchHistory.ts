import { model, Schema } from 'mongoose'
import { SearchQuery } from 'types'

const historyNoteSchema = new Schema<SearchQuery>({
	type: String,
	text: String,
	isSuccess: Boolean,
	runTime: Number,
	date: Date,
	userID: Number,
	userName: String,
})

export const HistoryNote = model<SearchQuery>('HistoryNote', historyNoteSchema)
