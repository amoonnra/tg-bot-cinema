import { model, Schema } from 'mongoose'
import { LocalUser, Movie } from '../../types'

const searchedSchema = new Schema<
	Pick<Movie, 'name' | 'nameEng' | 'year' | 'id' | 'imdbId' | 'kpId'>
>({
	name: String,
	nameEng: String,
	year: Number,
	id: Number,
	kpId: Number,
	imdbId: Number,
})

const movieSchema = new Schema<Movie>({
	id: Number,
	type: String,
	name: String,
	nameEng: String,
	age: String,
	poster: String,
	year: Number,
	imdbId: Number,
	kpId: Number,
	imdbRating: Number,
	kpRating: Number,
	time: String,
	quality: String,
	genre: String,
	country: String,
	lastSeason: Number || null,
	lastEpisode: Number || null,
})

const userSchema = new Schema<LocalUser>({
	id: Number,
	firstName: String,
	lastName: String,
	userName: String,
	language: String,
	registerDate: Date,
	lastDate: Date,
	searhed: [searchedSchema],
	bookmarks: [movieSchema],
})

export const User = model<LocalUser>('User', userSchema)
