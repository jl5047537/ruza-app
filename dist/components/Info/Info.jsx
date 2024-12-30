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
import { useToast } from '@/lib/contexts/ToastContext';
import TonIcon from '@/public/Icons/TonIcon';
import { useTonConnectUI } from '@tonconnect/ui-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Button from '../UI/Button/Button';
import styles from './Info.module.scss';
var Info = function (_a) {
    var user = _a.user;
    var showToast = useToast();
    var _b = useState([]), currencies = _b[0], setCurrencies = _b[1];
    var _c = useState(true), isLoading = _c[0], setIsLoading = _c[1];
    var _d = useState(null), error = _d[0], setError = _d[1];
    var _e = useState(null), selectedCurrency = _e[0], setSelectedCurrency = _e[1];
    var _f = useState(false), dropdownOpen = _f[0], setDropdownOpen = _f[1];
    var tonConnectUI = useTonConnectUI()[0];
    var fetchCurrencies = function () { return __awaiter(void 0, void 0, void 0, function () {
        var walletAddress, response, data, fetchedCurrencies, err_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!((_a = tonConnectUI.account) === null || _a === void 0 ? void 0 : _a.address)) {
                        setCurrencies([]);
                        setSelectedCurrency(null);
                        setError(null);
                        setIsLoading(false);
                        return [2 /*return*/];
                    }
                    setIsLoading(true);
                    setError(null);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, 5, 6]);
                    walletAddress = tonConnectUI.account.address;
                    return [4 /*yield*/, fetch("/api/currencies?address=".concat(walletAddress))];
                case 2:
                    response = _b.sent();
                    if (!response.ok) {
                        throw new Error('Failed to fetch currencies');
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _b.sent();
                    console.log('Fetched data:', data);
                    if (!data.currencies || data.currencies.length === 0) {
                        setError('Нет доступных криптовалют.');
                    }
                    else {
                        fetchedCurrencies = data.currencies.map(function (currency) { return ({
                            name: currency.name,
                            balance: currency.balance,
                        }); });
                        setCurrencies(fetchedCurrencies);
                        setSelectedCurrency(fetchedCurrencies[0] || null);
                    }
                    return [3 /*break*/, 6];
                case 4:
                    err_1 = _b.sent();
                    console.error('Error fetching currencies:', err_1);
                    setCurrencies([]);
                    setError('Не удалось загрузить данные.');
                    return [3 /*break*/, 6];
                case 5:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    useEffect(function () {
        var _a;
        if (!((_a = tonConnectUI.account) === null || _a === void 0 ? void 0 : _a.address)) {
            setCurrencies([]);
            setSelectedCurrency(null);
            setError(null);
            setIsLoading(false);
            return;
        }
        fetchCurrencies();
        var unsubscribe = tonConnectUI.onStatusChange(function () {
            fetchCurrencies();
        });
        return function () {
            unsubscribe();
        };
    }, [tonConnectUI]);
    var handleSelectCurrency = function (currency) {
        setSelectedCurrency(currency);
        setDropdownOpen(false);
        showToast("\u0412\u044B\u0431\u0440\u0430\u043D\u0430 \u0432\u0430\u043B\u044E\u0442\u0430 - ".concat(currency.name), 'success');
    };
    return (<div className={styles.info}>
			<div className={styles.infoCurrency}>
				<div className={styles.webTonIcon}>
					<div className={styles.web}>Сеть</div>
					<div className={styles.tonIcon}>
						<TonIcon />
					</div>
				</div>
				{isLoading && <p>Загрузка валют...</p>}
				{error && <p>{error}</p>}
				{!isLoading && currencies.length === 0 && !error && (<p className={styles.infoNotConnectWallet}>
						Данные не доступны, подключите кошелек
					</p>)}

				{!isLoading && currencies.length > 0 && (<div className={styles.dropdown}>
						<div className={styles.madMarker}>
							<div className={styles.marker}>Выберите валюту:</div>
							<div className={styles.selectedOption} onClick={function () { return setDropdownOpen(!dropdownOpen); }}>
								{selectedCurrency === null || selectedCurrency === void 0 ? void 0 : selectedCurrency.name}
							</div>
						</div>
						{dropdownOpen && (<ul className={styles.optionsList}>
								{currencies.map(function (currency, index) { return (<li key={index} className={styles.option} onClick={function () { return handleSelectCurrency(currency); }}>
										{currency.name} - {currency.balance}
									</li>); })}
							</ul>)}
					</div>)}
			</div>
			<div className={styles.infoUsers}>
				<div className={styles.avatar}>
					<Image src={user.avatar} width={150} height={150} alt='123'/>
				</div>
				<div className={styles.infoUser}>
					<div className={styles.userName}>
						<Link href='/profile'>{user.username}</Link>
					</div>
					<div className={styles.userLink}>@{user.user_link}</div>
					<div className={styles.level}>
						<Button onClick={function () {
            return showToast("\u0412\u0430\u0448 \u0442\u0435\u043A\u0443\u0449\u0438\u0439 \u0443\u0440\u043E\u0432\u0435\u043D\u044C: ".concat(user.level), 'success');
        }}>
							Уровень: {user.level}
						</Button>
					</div>
				</div>
			</div>
			<div className={styles.balanceUser}>
				{selectedCurrency && (<div className={styles.balance}>
						<h2>Доступный баланс:</h2>
						<p>
							{selectedCurrency.balance} {selectedCurrency.name}
						</p>
					</div>)}
			</div>
		</div>);
};
export default Info;
