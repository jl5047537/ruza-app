'use client';
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
import { triggerHapticFeedback } from '@/lib/utils/ui';
import ThemeIcon from '@/public/Icons/ThemeIcon';
import WalletIcon from '@/public/Icons/WalletIcon';
import { Address } from '@ton/core';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { useCallback, useEffect, useState } from 'react';
import Button from '../UI/Button/Button';
import styles from './Header.module.scss';
import LogotypeIcon from '@/public/Icons/LogotypeIcon';
var Header = function () {
    var tonConnectUI = useTonConnectUI()[0];
    var _a = useState(null), tonWalletAddress = _a[0], setTonWalletAddress = _a[1];
    var _b = useState(true), isLoading = _b[0], setIsLoading = _b[1];
    var _c = useState(false), copied = _c[0], setCopied = _c[1];
    var showToast = useToast();
    var updateWalletAddress = function (address) { return __awaiter(void 0, void 0, void 0, function () {
        var token, response, errorData, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = localStorage.getItem('jwt');
                    if (!token) {
                        console.error('JWT token is missing');
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, fetch('/api/wallet', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: "Bearer ".concat(token),
                            },
                            body: JSON.stringify({ tonWalletAddress: address }),
                        })];
                case 2:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    errorData = _a.sent();
                    console.error('Ошибка при подключении кошелька:', errorData.error);
                    showToast('Ошибка при подключении кошелька.', 'error');
                    return [2 /*return*/];
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    console.error('Error updating wallet address:', error_1);
                    showToast('Ошибка при подключении к серверу.', 'error');
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var handleWalletConnection = useCallback(function (address) {
        setTonWalletAddress(address);
        console.log('Кошелек успешно подключен!');
        updateWalletAddress(address);
        setIsLoading(false);
    }, []);
    var handleWalletDisconnection = useCallback(function () {
        setTonWalletAddress(null);
        console.log('Кошелек успешно отключен!');
        updateWalletAddress(null);
        setIsLoading(false);
    }, []);
    useEffect(function () {
        var checkWalletConnection = function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                if ((_a = tonConnectUI.account) === null || _a === void 0 ? void 0 : _a.address) {
                    handleWalletConnection((_b = tonConnectUI.account) === null || _b === void 0 ? void 0 : _b.address);
                }
                else {
                    handleWalletDisconnection();
                }
                return [2 /*return*/];
            });
        }); };
        checkWalletConnection();
        var unsubscribe = tonConnectUI.onStatusChange(function (wallet) {
            if (wallet) {
                handleWalletConnection(wallet.account.address);
            }
            else {
                handleWalletDisconnection();
            }
        });
        return function () {
            unsubscribe();
        };
    }, [tonConnectUI, handleWalletConnection, handleWalletDisconnection]);
    var handleWalletAction = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!tonConnectUI.connected) return [3 /*break*/, 2];
                    setIsLoading(true);
                    return [4 /*yield*/, tonConnectUI.disconnect()];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, tonConnectUI.openModal()];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var formatAddress = function (address) {
        var tempAddress = Address.parse(address).toString();
        return "".concat(tempAddress.slice(0, 4), "...").concat(tempAddress.slice(-4));
    };
    var copyToClipboard = function () {
        if (tonWalletAddress) {
            triggerHapticFeedback(window);
            navigator.clipboard.writeText(tonWalletAddress);
            setCopied(true);
            showToast('Адрес скопирован в буфер обмена!', 'success');
            setTimeout(function () { return setCopied(false); }, 2000);
        }
    };
    return (<div className={styles.header}>
			<div className={styles.container}>
				<div className={styles.left}>
					<LogotypeIcon />
				</div>
				<div className={styles.right}>
					<div className={styles.themeMode}>
						<ThemeIcon />
					</div>
					{tonWalletAddress ? (<div className={styles.wallet}>
							<div className={styles.leftWallet}>
								<p className={styles.pWallet}>Кошелек:</p>
								<p className={styles.pAdressWallet}>
									<Button onClick={copyToClipboard}>
										{formatAddress(tonWalletAddress)}
									</Button>
								</p>
							</div>
							<div className={styles.rightWallet}>
								<div className={styles.iconWallet}>
									<Button className={styles.disconnectWallet} onClick={handleWalletAction}>
										<WalletIcon />
									</Button>
								</div>
							</div>
						</div>) : (<div className={styles.walletAddress}>
							<Button className={styles.connectWallet} onClick={handleWalletAction}>
								Подключить кошелек
							</Button>
						</div>)}
				</div>
			</div>
		</div>);
};
export default Header;
