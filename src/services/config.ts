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
