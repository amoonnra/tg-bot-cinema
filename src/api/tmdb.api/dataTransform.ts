import { TmdbResponse } from 'types'

export const transformSearchedData = (
	data: TmdbResponse
): { id: number; type: 'movie' | 'tv' } | null => {
	const searchResult = data.movie_results[0] || data.tv_results[0]
	if (!searchResult) return null

	const { id, media_type } = searchResult

	return {
		id,
		type: media_type,
	}
}
