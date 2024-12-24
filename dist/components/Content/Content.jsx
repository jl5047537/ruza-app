import Info from '../Info/Info';
import Menu from '../Menu/Menu';
import WalletUsers from '../WalletUsers/WalletUsers';
import styles from './Content.module.scss';
var Content = function (_a) {
    var user = _a.user;
    return (<div className={styles.content}>
			<div className={styles.container}>
				<Info user={user}/>
				<Menu />
				<WalletUsers />
			</div>
		</div>);
};
export default Content;
