import { fetchUserWalletAddress } from '@/lib/api';
import { useToast } from '@/lib/contexts/ToastContext';
import useStore from '@/lib/store/store';
import { LEVEL_START } from '@/lib/utils/consts';
import CopyIcon from '@/public/Icons/CopyIcon';
import NoIcon from '@/public/Icons/NoIcon';
import YesIcon from '@/public/Icons/YesIcon';
import { useEffect, useState } from 'react';
import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';
import styles from './WalletUsers.module.scss';
import { WalletUser } from './WalletUsers.props';
var WalletUsers = function () {
    var _a = useStore(function (state) { return state; }), tonWalletAddress = _a.tonWalletAddress, walletStatus = _a.walletStatus;
    var _b = useState(''), userWalletAddress = _b[0], setUserWalletAddress = _b[1];
    var _c = useState(false), statusIcon = _c[0], setStatusIcon = _c[1];
    var _d = useState(false), isModalOpen = _d[0], setIsModalOpen = _d[1];
    var showToast = useToast();
    var isRefirral = false;
    var referralLink = "".concat(window.location.origin, "/auth?referralId=").concat(userWalletAddress);
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
    var handleCopyToClipboard = function () {
        navigator.clipboard.writeText(referralLink).then(function () {
            showToast('Ссылка скопирована', 'success');
        });
    };
    var copyToClipboardAddress = function () {
        navigator.clipboard.writeText(userWalletAddress);
        showToast('Адрес скопирован в буфер обмена!', 'success');
    };
    var handleInviteToTelegram = function () {
        window.open("https://t.me/share/url?url=".concat(encodeURIComponent(referralLink)), '_blank');
    };
    // Проверяем статус кошелька
    if (!walletStatus) {
        return (<div className={styles.walletUsers}>
				<div className={styles.blockName}>Кошельки получателей</div>
				<div className={styles.blockWalletUsers}>
					<p className={styles.walletUnavailable}>
						Данный раздел не доступен. Чтобы разблокировать, подключите кошелек.
					</p>
				</div>
			</div>);
    }
    return (<div className={styles.walletUsers}>
			<div className={styles.blockName}>Кошельки получателей</div>
			<div className={styles.blockWalletUsers}>
				{isRefirral === false ? (<div className={styles.noRefirral}>
						У вас нет рефералов, поэтому вы не видите остальные уровни
					</div>) : (WalletUser.map(function (item) { return (<div className={styles.itemWaletUsers} key={item.key}>
							<div className={styles.level}>{item.levelNumber}</div>
							<div className={styles.adressWallet}>
								<p className={styles.adressP}>Адрес кошелька</p>
								<p className={styles.adressWaletP}>{item.adressWallet}</p>
							</div>
							<div className={styles.iconStatus}>
								<NoIcon />
							</div>
						</div>); }))}

				<div className={styles.itemWaletUsers}>
					<div className={styles.level}>{LEVEL_START}</div>
					<div className={styles.adressWallet}>
						<p className={styles.adressP}>Ваш адрес кошелька</p>
						<button onClick={copyToClipboardAddress} className={styles.adressWaletP}>
							{userWalletAddress || 'Адрес кошелька не найден'}
						</button>
					</div>
					<div className={styles.iconStatus}>
						{statusIcon === true ? <YesIcon /> : <NoIcon />}
					</div>
				</div>

				<div className={styles.infoSendWallet}>
					Комиссия сети за каждый перевод 10%
				</div>

				<Button className={styles.sendAll}>Отправить всем</Button>
				<Button className={styles.sendAll} onClick={function () { return setIsModalOpen(true); }}>
					Пригласить друзей
				</Button>
			</div>

			{isModalOpen && (<Modal onClose={function () { return setIsModalOpen(false); }}>
					<div className={styles.modalContent}>
						<p className={styles.modalTitle}>Ваша реферальная ссылка</p>
						<div className={styles.referralContainer}>
							<input className={styles.referralInput} value={referralLink} readOnly/>
							<Button className={styles.copyButton} onClick={handleCopyToClipboard}>
								<CopyIcon />
							</Button>
						</div>
						<Button className={styles.telegramButton} onClick={handleInviteToTelegram}>
							Пригласить в Telegram
						</Button>
					</div>
				</Modal>)}
		</div>);
};
export default WalletUsers;
