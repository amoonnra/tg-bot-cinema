import { wit } from 'bot'
import fs from 'fs/promises'
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
var ffmpeg = require('fluent-ffmpeg')
ffmpeg.setFfmpegPath(ffmpegPath)

export const getTextFromVoice = async (url: string) => {
	try {
		const fileName = await convertWavToMp3(url)
		const res = await wit.speech('audio/ogg', await fs.readFile(fileName))

		await fs.unlink(url)
		await fs.unlink(fileName)

		return res.text
	} catch (error) {
		console.log(error)
	}
}

function convertWavToMp3(url: string): Promise<string> {
	const name = url.replace('input', 'output')

	return new Promise((resolve, reject) => {
		ffmpeg({
			source: url,
			format: 'ogg',
		})
			.on('error', (err: Error) => {
				reject(err)
			})
			.on('end', () => {
				resolve(name)
			})
			.save(name)
	})
}
