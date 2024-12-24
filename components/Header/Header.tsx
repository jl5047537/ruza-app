'use client'

import { useToast } from '@/lib/contexts/ToastContext'
import { triggerHapticFeedback } from '@/lib/utils/ui'
import ThemeIcon from '@/public/Icons/ThemeIcon'
import WalletIcon from '@/public/Icons/WalletIcon'
import { Address } from '@ton/core'
import { useTonConnectUI } from '@tonconnect/ui-react'
import { useCallback, useEffect, useState } from 'react'
import Logotype from '../Logotype/Logotype'
import Button from '../UI/Button/Button'
import styles from './Header.module.scss'

const Header = () => {
	const [tonConnectUI] = useTonConnectUI()
	const [tonWalletAddress, setTonWalletAddress] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [copied, setCopied] = useState(false)
	const showToast = useToast()

	const updateWalletAddress = async (address: string | null) => {
		const token = localStorage.getItem('jwt')
		if (!token) {
			console.error('JWT token is missing')
			return
		}

		try {
			const response = await fetch('/api/wallet', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ tonWalletAddress: address }),
			})

			if (!response.ok) {
				const errorData = await response.json()
				console.error('Ошибка при подключении кошелька:', errorData.error)
				showToast('Ошибка при подключении кошелька.', 'error')
				return
			}
		} catch (error) {
			console.error('Error updating wallet address:', error)
			showToast('Ошибка при подключении к серверу.', 'error')
		}
	}

	const handleWalletConnection = useCallback((address: string) => {
		setTonWalletAddress(address)
		console.log('Кошелек успешно подключен!')
		updateWalletAddress(address)
		setIsLoading(false)
	}, [])

	const handleWalletDisconnection = useCallback(() => {
		setTonWalletAddress(null)
		console.log('Кошелек успешно отключен!')
		updateWalletAddress(null)
		setIsLoading(false)
	}, [])

	useEffect(() => {
		const fetchWalletAddress = async () => {
			const token = localStorage.getItem('jwt')
			if (!token) {
				console.error('JWT token is missing')
				setIsLoading(false)
				return
			}

			try {
				const response = await fetch('/api/wallet', {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})

				if (!response.ok) {
					const errorData = await response.json()
					console.error('Ошибка получения адреса кошелька:', errorData.error)
					setIsLoading(false)
					return
				}

				const { tonWalletAddress } = await response.json()
				if (tonWalletAddress) {
					setTonWalletAddress(tonWalletAddress)
				}
			} catch (error) {
				console.error('Error fetching wallet address:', error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchWalletAddress()

		const unsubscribe = tonConnectUI.onStatusChange(wallet => {
			if (wallet) {
				handleWalletConnection(wallet.account.address)
			} else {
				handleWalletDisconnection()
			}
		})

		return () => {
			unsubscribe()
		}
	}, [tonConnectUI, handleWalletConnection, handleWalletDisconnection])

	const handleWalletAction = async () => {
		if (tonConnectUI.connected) {
			setIsLoading(true)
			await tonConnectUI.disconnect()
		} else {
			await tonConnectUI.openModal()
		}
	}

	const formatAddress = (address: string) => {
		const tempAddress = Address.parse(address).toString()
		return `${tempAddress.slice(0, 4)}...${tempAddress.slice(-4)}`
	}

	const copyToClipboard = () => {
		if (tonWalletAddress) {
			triggerHapticFeedback(window)
			navigator.clipboard.writeText(tonWalletAddress)
			setCopied(true)
			showToast('Адрес скопирован в буфер обмена!', 'success')
			setTimeout(() => setCopied(false), 2000)
		}
	}

	return (
		<div className={styles.header}>
			<div className={styles.container}>
				<div className={styles.left}>
					<Logotype />
				</div>
				<div className={styles.right}>
					<div className={styles.themeMode}>
						<ThemeIcon />
					</div>
					{tonWalletAddress ? (
						<div className={styles.wallet}>
							<div className={styles.leftWallet}>
								<p className={styles.pWallet}>Кошелек:</p>
								<p className={styles.pAdressWallet}>
									<Button onClick={copyToClipboard}>
										{formatAddress(tonWalletAddress)}
									</Button>
								</p>
							</div>
							<div className={styles.rightWallet}>
								<div className={styles.iconWallet}>
									<Button
										className={styles.disconnectWallet}
										onClick={handleWalletAction}
									>
										<WalletIcon />
									</Button>
								</div>
							</div>
						</div>
					) : (
						<div className={styles.walletAddress}>
							<Button
								className={styles.connectWallet}
								onClick={handleWalletAction}
							>
								Подключить кошелек
							</Button>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default Header
