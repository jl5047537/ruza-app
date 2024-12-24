import { LEVEL_START } from '@/lib/utils/consts'
import NoIcon from '@/public/Icons/NoIcon'
import YesIcon from '@/public/Icons/YesIcon'
import Button from '../UI/Button/Button'
import styles from './WalletUsers.module.scss'
import { WalletUser } from './WalletUsers.props'

const WalletUsers = () => {
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
						<p className={styles.adressWaletP}>UGDPu8aRg6dsddt72stTx024</p>
					</div>
					<div className={styles.iconStatus}>
						<YesIcon />
					</div>
				</div>
				<div className={styles.infoSendWallet}>
					Комиссия сети за каждый перевод 0,5 итого 2
				</div>
				<Button className={styles.sendAll}>Отправить всем</Button>
			</div>
		</div>
	)
}

export default WalletUsers
