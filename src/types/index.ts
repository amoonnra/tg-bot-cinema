import { InputFile } from 'grammy'

export interface MenuPoster {
	photo: InputFile | string
	other: { caption: string }
}
