import { usePathname } from 'next/navigation';
import Info from '../Info/Info';
import Menu from '../Menu/Menu';
import WalletUsers from '../WalletUsers/WalletUsers';
import styles from './Content.module.scss';
import Referrals from '../Referrals/Referrals';
var Content = function (_a) {
    var user = _a.user;
    var activePage = usePathname();
    return (<div className={styles.content}>
			<div className={styles.container}>
				<Info user={user}/>
				<Menu />
				{activePage === '/' ? <WalletUsers /> : ''}
				{activePage === '/referrals' ? <Referrals /> : ''}
			</div>
		</div>);
};
export default Content;
