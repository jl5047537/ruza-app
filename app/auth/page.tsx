'use client'

import useStore from '@/lib/store/store'
import ConnectIcon from '@/public/Icons/ConnectIcon'
import RuzaIcon from '@/public/Icons/RuzaIcon'
import TelegramIcon from '@/public/Icons/TelegramIcon'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from './Page.module.scss'
import { BOT_NAME } from '@/lib/utils/consts'

export default function AuthPage() {
	const [message, setMessage] = useState('')
	const router = useRouter()
	const { setAuthentication } = useStore()

	useEffect(() => {
		const token = localStorage.getItem('jwt')

		if (token) {
			setMessage('Вы уже авторизованы. Вернитесь на главную страницу.')
			router.push('/')
		} else {
			const params = new URLSearchParams(window.location.search)
			const urlToken = params.get('token')

			if (urlToken) {
				localStorage.setItem('jwt', urlToken)

				setAuthentication(true, urlToken, null)

				router.push('/')
			} else {
				setMessage(
					'Добро пожаловать в RuZa! Вы не авторизованы или ваша сессия подошла к концу, для продолжения требуется войти.'
				)
			}
		}
	}, [router, setAuthentication])

	const telegramLoginUrl = `https://telegram.me/${BOT_NAME}?start=auth`

	return (
		<div className={styles.auth}>
			<div className={styles.blockAuth}>
				<div className={styles.iconAuth}>
					<div>
						<RuzaIcon />
					</div>
					<div className={styles.connectIcon}>
						<ConnectIcon />
					</div>
					<div>
						<TelegramIcon />
					</div>
				</div>
				<h1>Авторизация через Telegram</h1>
				<p>{message}</p>
				<a href={telegramLoginUrl}>
					<button>Войти</button>
				</a>
				<a href='/' className={styles.userSucces}>
					Пользовательское соглашение
				</a>
			</div>
		</div>
	)
}
