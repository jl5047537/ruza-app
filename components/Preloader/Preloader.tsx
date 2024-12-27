'use client'

import { User } from '@/app/home/Page.props'
import useStore from '@/lib/store/store'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import styles from './Preloader.module.scss'

interface PreloaderProps {
	onLoaded: (user: User | null, isWalletConnected: boolean) => void
}

const Preloader: React.FC<PreloaderProps> = ({ onLoaded }) => {
	const [isLoading, setIsLoading] = useState(true)
	const router = useRouter()

	const {
		setAuthentication,
		resetAuthState,
		setTonWalletAddress,
		setWalletStatus,
	} = useStore()

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

				setAuthentication(true, token, user)

				const walletResponse = await fetch('/api/wallet', {
					method: 'GET',
					headers: { Authorization: `Bearer ${token}` },
				})

				let isWalletConnected = false
				if (walletResponse.ok) {
					const { tonWalletAddress, walletStatus } = await walletResponse.json()
					isWalletConnected = !!(tonWalletAddress && walletStatus)

					setTonWalletAddress(tonWalletAddress)
					setWalletStatus(walletStatus)
				}

				onLoaded(user, isWalletConnected)
			} catch (error) {
				console.error('Ошибка загрузки данных:', error)
				onLoaded(null, false)
				setAuthentication(false, null, null)
				setTonWalletAddress(null)
				setWalletStatus(false)
			} finally {
				setIsLoading(false)
			}
		}

		fetchData()
	}, [
		router,
		onLoaded,
		setAuthentication,
		setTonWalletAddress,
		setWalletStatus,
	])

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
