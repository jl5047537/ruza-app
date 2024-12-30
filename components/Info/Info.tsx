import { useToast } from '@/lib/contexts/ToastContext'
import TonIcon from '@/public/Icons/TonIcon'
import { useTonConnectUI } from '@tonconnect/ui-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Button from '../UI/Button/Button'
import styles from './Info.module.scss'
import { CryptoCurrency, InfoProps } from './Info.props'

const Info = ({ user }: InfoProps) => {
	const showToast = useToast()
	const [currencies, setCurrencies] = useState<CryptoCurrency[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [selectedCurrency, setSelectedCurrency] =
		useState<CryptoCurrency | null>(null)
	const [dropdownOpen, setDropdownOpen] = useState(false)
	const [tonConnectUI] = useTonConnectUI()

	const fetchCurrencies = async () => {
		if (!tonConnectUI.account?.address) {
			setCurrencies([])
			setSelectedCurrency(null)
			setError(null)
			setIsLoading(false)
			return
		}

		setIsLoading(true)
		setError(null)

		try {
			const walletAddress = tonConnectUI.account.address

			const response = await fetch(`/api/currencies?address=${walletAddress}`)
			if (!response.ok) {
				throw new Error('Failed to fetch currencies')
			}

			const data = await response.json()
			console.log('Fetched data:', data)

			if (!data.currencies || data.currencies.length === 0) {
				setError('Нет доступных криптовалют.')
			} else {
				const fetchedCurrencies = data.currencies.map((currency: any) => ({
					name: currency.name,
					balance: currency.balance,
				}))

				setCurrencies(fetchedCurrencies)
				setSelectedCurrency(fetchedCurrencies[0] || null)
			}
		} catch (err: any) {
			console.error('Error fetching currencies:', err)
			setCurrencies([])
			setError('Не удалось загрузить данные.')
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		if (!tonConnectUI.account?.address) {
		  setCurrencies([]);
		  setSelectedCurrency(null);
		  setError(null);
		  setIsLoading(false);
		  return;
		}
	  
		fetchCurrencies();
		
		const unsubscribe = tonConnectUI.onStatusChange(() => {
		  fetchCurrencies();
		});
	  
		return () => {
		  unsubscribe();
		};
	  }, [tonConnectUI]);

	const handleSelectCurrency = (currency: CryptoCurrency) => {
		setSelectedCurrency(currency)
		setDropdownOpen(false)
		showToast(`Выбрана валюта - ${currency.name}`, 'success')
	}

	return (
		<div className={styles.info}>
			<div className={styles.infoCurrency}>
				<div className={styles.webTonIcon}>
					<div className={styles.web}>Сеть</div>
					<div className={styles.tonIcon}>
						<TonIcon />
					</div>
				</div>
				{isLoading && <p>Загрузка валют...</p>}
				{error && <p>{error}</p>}
				{!isLoading && currencies.length === 0 && !error && (
					<p className={styles.infoNotConnectWallet}>
						Данные не доступны, подключите кошелек
					</p>
				)}

				{!isLoading && currencies.length > 0 && (
					<div className={styles.dropdown}>
						<div className={styles.madMarker}>
							<div className={styles.marker}>Выберите валюту:</div>
							<div
								className={styles.selectedOption}
								onClick={() => setDropdownOpen(!dropdownOpen)}
							>
								{selectedCurrency?.name}
							</div>
						</div>
						{dropdownOpen && (
							<ul className={styles.optionsList}>
								{currencies.map((currency, index) => (
									<li
										key={index}
										className={styles.option}
										onClick={() => handleSelectCurrency(currency)}
									>
										{currency.name} - {currency.balance}
									</li>
								))}
							</ul>
						)}
					</div>
				)}
			</div>
			<div className={styles.infoUsers}>
				<div className={styles.avatar}>
					<Image src={user.avatar} width={150} height={150} alt='123' />
				</div>
				<div className={styles.infoUser}>
					<div className={styles.userName}>
						<Link href='/profile'>{user.username}</Link>
					</div>
					<div className={styles.userLink}>@{user.user_link}</div>
					<div className={styles.level}>
						<Button
							onClick={() =>
								showToast(`Ваш текущий уровень: ${user.level}`, 'success')
							}
						>
							Уровень: {user.level}
						</Button>
					</div>
				</div>
			</div>
			<div className={styles.balanceUser}>
				{selectedCurrency && (
					<div className={styles.balance}>
						<h2>Доступный баланс:</h2>
						<p>
							{selectedCurrency.balance} {selectedCurrency.name}
						</p>
					</div>
				)}
			</div>
		</div>
	)
}

export default Info
