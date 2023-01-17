import { inclinedTypeName, MovieType, pluralTypeName } from 'types'

export class Searchtext {
	constructor(public searchType: MovieType, public text: string) {}
	getResultText() {
		return `🔍 Вот, какие <b>${pluralTypeName[
			this.searchType
		].toLowerCase()}</b> нам удалось найти по запросу — <u>${this.text}</u>:`
	}
	getFailedText() {
		return `😞 ${inclinedTypeName[this.searchType]} c названием — <u>${
			this.text
		}</u> не удалось найти в нашей базе. Попробуйте указать более точное название.

${
	this.text.match(/\D[2345678]$/gm)
		? '❗ Возможно часть франшизы нужно указать римскими цифрами '
		: ''
}${
			this.text.includes('е')
				? '❗ Возможно в названии используется буква Ё, вместо Е'
				: ''
		}`
	}

}
