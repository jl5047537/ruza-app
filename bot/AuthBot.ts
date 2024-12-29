import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import TelegramBot from 'node-telegram-bot-api'

const prisma = new PrismaClient()

dotenv.config()

const token = process.env.TELEGRAM_BOT_TOKEN
const jwtSecret = process.env.JWT_SECRET

if (!token) {
	throw new Error('TELEGRAM_BOT_TOKEN not found in environment variables')
}

if (!jwtSecret) {
	throw new Error('JWT_SECRET not found in environment variables')
}

const bot = new TelegramBot(token, { polling: true })

bot.onText(/\/start(\?referral=(\d+))?/, async (msg, match) => {
	const chatId = msg.chat.id

	const referralId = match?.[2] ? match[2] : null

	const existingUser = await prisma.user.findUnique({
		where: { telegramId: chatId.toString() },
	})

	if (existingUser) {
		const jwtToken = jwt.sign({ id: existingUser.id }, jwtSecret, {
			expiresIn: '1h',
		})
		bot.sendMessage(
			chatId,
			`Вы авторизованы. Перейдите по ссылке: ${process.env.BASE_URL}/auth?token=${jwtToken}`
		)
	} else {
		bot.sendMessage(chatId, 'Привет! Для регистрации введите команду /auth')
	}
})

bot.onText(/\/auth/, async msg => {
	const chatId = msg.chat.id
	const firstName = msg.chat.first_name
	const userLink = msg.chat.username

	try {
		const photos = await bot.getUserProfilePhotos(chatId)

		let avatarUrl = ''
		if (photos.total_count > 0) {
			const fileId = photos.photos[0][0].file_id
			const file = await bot.getFile(fileId)
			avatarUrl = `https://api.telegram.org/file/bot${token}/${file.file_path}`
		}

		const referralId = msg.text?.split(' ')[1]

		const existingUser = await prisma.user.findUnique({
			where: { telegramId: chatId.toString() },
		})

		if (existingUser) {
			bot.sendMessage(chatId, 'Вы уже зарегистрированы.')
			return
		}

		const newUser = await prisma.user.create({
			data: {
				telegramId: chatId.toString(),
				username: firstName,
				avatar: avatarUrl,
				user_link: userLink,
				referral: referralId || undefined,
			},
		})

		const jwtToken = jwt.sign({ id: newUser.id }, jwtSecret, {
			expiresIn: '1h',
		})

		const redirectUrl = `${process.env.BASE_URL}/auth?token=${jwtToken}`
		bot.sendMessage(
			chatId,
			`Регистрация успешна! Переходите по ссылке для завершения: ${redirectUrl}`
		)

		if (referralId) {
			await prisma.user.update({
				where: { id: referralId },
				data: {
					referrals: {
						connect: {
							id: newUser.id,
						},
					},
				},
			})
		}
	} catch (error) {
		console.error('Ошибка при сохранении пользователя:', error)
		bot.sendMessage(
			chatId,
			'Произошла ошибка при регистрации. Попробуйте снова.'
		)
	}
})

console.log('Бот запущен. Ожидаем сообщения...')
