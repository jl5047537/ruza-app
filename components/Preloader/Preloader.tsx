'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@/app/home/Page.props'
import styles from './Preloader.module.scss'

interface PreloaderProps {
	onLoaded: (user: User | null, isWalletConnected: boolean) => void
}

const Preloader: React.FC<PreloaderProps> = ({ onLoaded }) => {
	const [isLoading, setIsLoading] = useState(true)
	const router = useRouter()

	useEffect(() => {
		const token = localStorage.getItem('jwt')

		if (!token) {
			router.push('/auth')
			return
		}

		const fetchData = async () => {
			try {
				const userResponse = await fetch('/api/auth/me', {
					headers: { Authorization: `Bearer ${token}` },
				})

				let user = null
				if (userResponse.ok) {
					const userData = await userResponse.json()
					user = userData?.user || null
				} else {
					localStorage.removeItem('jwt')
					router.push('/auth')
					return
				}

				let isWalletConnected = false
				const walletResponse = await fetch('/api/wallet', {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})

				if (walletResponse.ok) {
					const { tonWalletAddress, walletStatus } = await walletResponse.json()
					isWalletConnected = !!(tonWalletAddress && walletStatus)
				}

				onLoaded(user, isWalletConnected)
			} catch (error) {
				console.error('Ошибка загрузки данных:', error)
				onLoaded(null, false)
			} finally {
				setIsLoading(false)
			}
		}

		fetchData()
	}, [router, onLoaded])

	if (isLoading) {
		return (
			<div className={styles.loading}>
				<p>Загрузка...</p>
			</div>
		)
	}

	return null
}

export default Preloader