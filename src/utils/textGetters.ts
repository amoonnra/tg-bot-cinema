import { inclinedTypeName, MovieType, pluralTypeName } from 'types'

export class Searchtext {
	constructor(public text: string, public searchType: MovieType | null) {}
	getResultText() {
		return `🔍 Вот, <b>${this.searchType ? 'какие ' + pluralTypeName[
			this.searchType 
		].toLowerCase() : 'что'}</b> нам удалось найти по запросу — <u>${this.text}</u>:`
	}
	getFailedText() {
		return `😞 ${this.searchType ? inclinedTypeName[this.searchType] : 'Материалов'} c названием — <u>${
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
