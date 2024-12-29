import { fetchUserWalletAddress } from '@/lib/api'
import useStore from '@/lib/store/store'
import { LEVEL_START } from '@/lib/utils/consts'
import NoIcon from '@/public/Icons/NoIcon'
import YesIcon from '@/public/Icons/YesIcon'
import { useEffect, useState } from 'react'
import Button from '../UI/Button/Button'
import styles from './WalletUsers.module.scss'
import { WalletUser } from './WalletUsers.props'
import { jwtDecode } from 'jwt-decode'

const WalletUsers = () => {
	const { tonWalletAddress, walletStatus } = useStore(state => state)
	const [userWalletAddress, setUserWalletAddress] = useState<string>('')
	const [statusIcon, setStatusIcon] = useState<boolean>(false)
	const [referralLink, setReferralLink] = useState<string>('')

	useEffect(() => {
		const token = localStorage.getItem('jwt') || ''
		if (token && walletStatus) {
			fetchUserWalletAddress(token).then(address => {
				if (address) {
					setUserWalletAddress(address)
					setStatusIcon(true)
				} else {
					setUserWalletAddress('Адрес не найден')
					setStatusIcon(false)
				}
			})
		}
	}, [walletStatus])

	const generateReferralLink = async () => {
		try {
		  const token = localStorage.getItem('jwt')
		  if (!token) {
			alert('Ошибка: пользователь не авторизован!')
			return
		  }
	  
		  const decodedToken = jwtDecode<{ id: string }>(token)
		  const userId = decodedToken.id
	  
		  const response = await fetch('/api/referral', {
			method: 'POST',
			body: JSON.stringify({ userId }),
			headers: { 'Content-Type': 'application/json' },
		  })
	  
		  const data = await response.json()
	  
		  if (data.referralLink) {
			setReferralLink(data.referralLink)
			alert(`Ваша реферальная ссылка: ${data.referralLink}`)
		  } else {
			alert('Ошибка при получении реферальной ссылки')
		  }
		} catch (error) {
		  alert('Ошибка при генерации ссылки')
		  console.error(error)
		}
	  }

	if (!walletStatus) {
		return (
			<div className={styles.walletUsers}>
				<div className={styles.blockName}>Кошельки получателей</div>
				<div className={styles.blockWalletUsers}>
					<p className={styles.walletUnavailable}>
						Данный раздел не доступен. Чтобы разблокировать, подключите кошелек
					</p>
				</div>
			</div>
		)
	}

	return (
		<div className={styles.walletUsers}>
			<div className={styles.blockName}>Кошельки получателей</div>
			<div className={styles.blockWalletUsers}>
				{WalletUser.map(item => (
					<div className={styles.itemWaletUsers} key={item.key}>
						<div className={styles.level}>{item.levelNumber}</div>
						<div className={styles.adressWallet}>
							<p className={styles.adressP}>Адрес кошелька</p>
							<p className={styles.adressWaletP}>{item.adressWallet}</p>
						</div>
						<div className={styles.iconStatus}>
							<NoIcon />
						</div>
					</div>
				))}
				<div className={styles.itemWaletUsers}>
					<div className={styles.level}>{LEVEL_START}</div>
					<div className={styles.adressWallet}>
						<p className={styles.adressP}>Адрес кошелька</p>
						<p className={styles.adressWaletP}>
							{userWalletAddress || 'Адрес кошелька не найден'}
						</p>
					</div>
					<div className={styles.iconStatus}>
						{statusIcon === true ? <YesIcon /> : <NoIcon />}
					</div>
				</div>
				<div className={styles.infoSendWallet}>
					Комиссия сети за каждый перевод 10%
				</div>
				<Button className={styles.sendAll}>Отправить всем</Button>
				<Button className={styles.sendAll} onClick={generateReferralLink}>
					Пригласить друзей
				</Button>
				{referralLink && (
					<div className={styles.referralLink}>
						<p>Ваша реферальная ссылка:</p>
						<a href={referralLink} target='_blank' rel='noopener noreferrer'>
							{referralLink}
						</a>
					</div>
				)}
			</div>
		</div>
	)
}

export default WalletUsers
