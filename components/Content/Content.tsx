import { usePathname } from 'next/navigation'
import Info from '../Info/Info'
import Menu from '../Menu/Menu'
import WalletUsers from '../WalletUsers/WalletUsers'
import styles from './Content.module.scss'
import { ContentProps } from './Content.props'
import Referrals from '../Referrals/Referrals'

const Content = ({ user }: ContentProps) => {

	const activePage = usePathname()
	
	return (
		<div className={styles.content}>
			<div className={styles.container}>
				<Info user={user} />
				<Menu />
				{activePage === '/' ? <WalletUsers /> : ''}
				{activePage === '/referrals' ? <Referrals /> : ''}
			</div>
		</div>
	)
}

export default Content
