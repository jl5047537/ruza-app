import { fetchUserWalletAddress } from '@/lib/api';
import useStore from '@/lib/store/store';
import { LEVEL_START } from '@/lib/utils/consts';
import NoIcon from '@/public/Icons/NoIcon';
import YesIcon from '@/public/Icons/YesIcon';
import { useEffect, useState } from 'react';
import Button from '../UI/Button/Button';
import styles from './WalletUsers.module.scss';
import { WalletUser } from './WalletUsers.props';
var WalletUsers = function () {
    var _a = useStore(function (state) { return state; }), tonWalletAddress = _a.tonWalletAddress, walletStatus = _a.walletStatus;
    var _b = useState(''), userWalletAddress = _b[0], setUserWalletAddress = _b[1];
    var _c = useState(false), statusIcon = _c[0], setStatusIcon = _c[1];
    useEffect(function () {
        var token = localStorage.getItem('jwt') || '';
        if (token && walletStatus) {
            fetchUserWalletAddress(token).then(function (address) {
                if (address) {
                    setUserWalletAddress(address);
                    setStatusIcon(true);
                }
                else {
                    setUserWalletAddress('Адрес не найден');
                    setStatusIcon(false);
                }
            });
        }
    }, [walletStatus]);
    if (!walletStatus) {
        return (<div className={styles.walletUsers}>
				<div className={styles.blockName}>Кошельки получателей</div>
				<div className={styles.blockWalletUsers}>
					<p className={styles.walletUnavailable}>
						Данный раздел не доступен. Чтобы разблокировать, подключите кошелек
					</p>
				</div>
			</div>);
    }
    return (<div className={styles.walletUsers}>
			<div className={styles.blockName}>Кошельки получателей</div>
			<div className={styles.blockWalletUsers}>
				{WalletUser.map(function (item) { return (<div className={styles.itemWaletUsers} key={item.key}>
						<div className={styles.level}>{item.levelNumber}</div>
						<div className={styles.adressWallet}>
							<p className={styles.adressP}>Адрес кошелька</p>
							<p className={styles.adressWaletP}>{item.adressWallet}</p>
						</div>
						<div className={styles.iconStatus}>
							<NoIcon />
						</div>
					</div>); })}
				<div className={styles.itemWaletUsers}>
					<div className={styles.level}>{LEVEL_START}</div>
					<div className={styles.adressWallet}>
						<p className={styles.adressP}>Адрес кошелька</p>
						<p className={styles.adressWaletP}>
							{userWalletAddress || 'Адрес кошелька не найден'}
						</p>
					</div>
					<div className={styles.iconStatus}>
						{statusIcon === true ? <NoIcon /> : <YesIcon />}
					</div>
				</div>
				<div className={styles.infoSendWallet}>
					Комиссия сети за каждый перевод 10%
				</div>
				<Button className={styles.sendAll}>Отправить всем</Button>
				<Button className={styles.sendAll}>Пригласить друзей</Button>
			</div>
		</div>);
};
export default WalletUsers;
