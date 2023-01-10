export interface ItemResult {
	id: number
	media_type: 'movie' | 'tv'
}


export interface TmdbResponse {
	movie_results: ItemResult[]
	tv_results: ItemResult[]
}
