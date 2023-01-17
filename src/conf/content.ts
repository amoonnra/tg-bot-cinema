import * as dotenv from 'dotenv'
dotenv.config({ path: '.env' })

export default {
	message: {
		start:
			'🔥 <b><u>Cinemagic Bot</u></b> — уникальный в своём роде бот, который даст Вам возможность бесплатно и без рекламы наслаждаться новинками кинематографа с любого устройства. \n\nВы точно сможете подыскать для себя фильм или сериал из огоромной базы более 55 000 киноработ',
		errorRequest: '🤨 <b><u>Ваш запрос не распознан.</u></b> Вернитесь в главное меню.',
		bookmarkAdded: '✅ Данное кинопроизведение успшно добавлено в ваши закладки',
		bookmarkRemoved: '❌ Данное кинопроизведение удалено из ваших закладок.',
	},
	button: {
		watch: '🍿 Смотреть онлайн',
		addToBookmarks: '➕  Добавить в закладки',
		removeFromBookmarks: '➖  Убрать из закладок',
		prevPage: '⏪',
		nextPage: '⏩',
		goBack: '◀️  Назад',
		goBackToMenu: '🏠  Меню',
		goBackToMainMenu: '🏠 Главное меню',
		goBackToSearch: '◀️  Категории',
	},
	url: {
		site: process.env.SITE_URL,
		support: process.env.SUPPORT_URL,
		ourChannel: process.env.OUR_CHANNEL_URL,
	},
	moviesLimit: '50',
}
