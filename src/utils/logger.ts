import fs from 'fs'

export const logg = async (message: Error | unknown) => {
	const date = new Date()
	const day = date.getDate()
	const month = date.getMonth() + 1
	const year = date.getFullYear()

	const dirPath = `logs/${month < 10 ? '0' + month : month}_${year}`
	const filePath = dirPath + `/${day < 10 ? '0' + day : day}.json`

	if (message instanceof Error) {
		console.log(message.name)
	} else {
		console.log(message)
	}

	try {
		if (!fs.existsSync(dirPath)) {
			await fs.promises.mkdir(dirPath, { recursive: true })
		}

		await fs.promises.appendFile(
			filePath,
			JSON.stringify({ time: date.toLocaleString(), message }, null, 2)
		)
	} catch (err) {
		console.log('Ошибка при логировании: ', err)
	}
}
