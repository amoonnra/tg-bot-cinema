import axios from 'axios'
import Config from 'conf'
import * as dotenv from 'dotenv'
import https from 'https'

dotenv.config({ path: '.env' })

export const movieBaseApi = axios.create({
	baseURL: process.env.MOVIE_BASE_URL,
	httpsAgent: new https.Agent({ keepAlive: true }),
	params: {
		token: process.env.MOVIE_BASE_TOKEN,
		limit: Config.get('moviesLimit'),
	},
	headers: { 'Content-Type': 'application/json' },
})

export const tmdbApi = axios.create({
	baseURL: 'https://api.themoviedb.org/3',
	httpsAgent: new https.Agent({ keepAlive: true }),
	params: {
		api_key: '8ffe14737f3bb0bba65c781d6ac7fda6',
	},
	headers: { 'Content-Type': 'application/json' },
})
