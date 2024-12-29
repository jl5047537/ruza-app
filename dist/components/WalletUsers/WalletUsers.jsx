var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { fetchUserWalletAddress } from '@/lib/api';
import useStore from '@/lib/store/store';
import { LEVEL_START } from '@/lib/utils/consts';
import NoIcon from '@/public/Icons/NoIcon';
import YesIcon from '@/public/Icons/YesIcon';
import { useEffect, useState } from 'react';
import Button from '../UI/Button/Button';
import styles from './WalletUsers.module.scss';
import { WalletUser } from './WalletUsers.props';
import { jwtDecode } from 'jwt-decode';
var WalletUsers = function () {
    var _a = useStore(function (state) { return state; }), tonWalletAddress = _a.tonWalletAddress, walletStatus = _a.walletStatus;
    var _b = useState(''), userWalletAddress = _b[0], setUserWalletAddress = _b[1];
    var _c = useState(false), statusIcon = _c[0], setStatusIcon = _c[1];
    var _d = useState(''), referralLink = _d[0], setReferralLink = _d[1];
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
    var generateReferralLink = function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, decodedToken, userId, response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    token = localStorage.getItem('jwt');
                    if (!token) {
                        alert('Ошибка: пользователь не авторизован!');
                        return [2 /*return*/];
                    }
                    decodedToken = jwtDecode(token);
                    userId = decodedToken.id;
                    return [4 /*yield*/, fetch('/api/referral', {
                            method: 'POST',
                            body: JSON.stringify({ userId: userId }),
                            headers: { 'Content-Type': 'application/json' },
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    if (data.referralLink) {
                        setReferralLink(data.referralLink);
                        alert("\u0412\u0430\u0448\u0430 \u0440\u0435\u0444\u0435\u0440\u0430\u043B\u044C\u043D\u0430\u044F \u0441\u0441\u044B\u043B\u043A\u0430: ".concat(data.referralLink));
                    }
                    else {
                        alert('Ошибка при получении реферальной ссылки');
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    alert('Ошибка при генерации ссылки');
                    console.error(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
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
				{referralLink && (<div className={styles.referralLink}>
						<p>Ваша реферальная ссылка:</p>
						<a href={referralLink} target='_blank' rel='noopener noreferrer'>
							{referralLink}
						</a>
					</div>)}
			</div>
		</div>);
};
export default WalletUsers;
