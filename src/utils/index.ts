import axios from 'axios'

export * from './DotNestedKeys'

export const delay = async (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const errorCatcher = (error: unknown) => {
	if (axios.isAxiosError(error)) {
		console.log('Error message: ', error)
		return error.message
	} else {
		console.log('Unexpected error: ', error)
		return 'An unexpected error occurred'
	}
}