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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { Address } from '@ton/core';
import { TonClient } from '@ton/ton';
import { NextResponse } from 'next/server';
var TON_API_ENDPOINT = 'https://toncenter.com/api/v2/jsonRPC';
// Функция для получения данных о жетонах
function fetchJettons(client, walletAddress) {
    return __awaiter(this, void 0, void 0, function () {
        var jettons, result, jettonWalletCell, jettonWalletAddress, jettonData, name_1, balance, error_1, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jettons = [];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 9, , 10]);
                    return [4 /*yield*/, client.runMethod(walletAddress, 'get_wallets')];
                case 2:
                    result = _a.sent();
                    if (!result.stack) return [3 /*break*/, 8];
                    _a.label = 3;
                case 3:
                    if (!(result.stack.remaining > 0)) return [3 /*break*/, 8];
                    jettonWalletCell = result.stack.readCell();
                    jettonWalletAddress = Address.parseRaw(jettonWalletCell.bits.toString());
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, client.runMethod(jettonWalletAddress, 'get_jetton_data')];
                case 5:
                    jettonData = _a.sent();
                    name_1 = jettonData.stack.readString();
                    balance = jettonData.stack.readBigNumber();
                    jettons.push({
                        name: name_1,
                        balance: (Number(balance) / 1e9).toFixed(2),
                    });
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    console.error("Failed to fetch data for Jetton at ".concat(jettonWalletAddress, ":"), error_1);
                    return [3 /*break*/, 7];
                case 7: return [3 /*break*/, 3];
                case 8: return [3 /*break*/, 10];
                case 9:
                    error_2 = _a.sent();
                    console.error('Error fetching jettons:', error_2);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/, jettons];
            }
        });
    });
}
function fetchCurrencies(address) {
    return __awaiter(this, void 0, void 0, function () {
        var client, walletAddress, contractState, currencies, jettons, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    client = new TonClient({ endpoint: TON_API_ENDPOINT });
                    walletAddress = Address.parse(address);
                    return [4 /*yield*/, client.getContractState(walletAddress)];
                case 1:
                    contractState = _a.sent();
                    if (!contractState || contractState.state !== 'active') {
                        console.warn('Inactive wallet or no contract state for:', address);
                        return [2 /*return*/, [
                                {
                                    name: 'TON',
                                    balance: (Number(contractState.balance) / 1e9).toFixed(2),
                                },
                            ]];
                    }
                    currencies = [
                        {
                            name: 'TON',
                            balance: (Number(contractState.balance) / 1e9).toFixed(2),
                        },
                    ];
                    return [4 /*yield*/, fetchJettons(client, walletAddress)];
                case 2:
                    jettons = _a.sent();
                    return [2 /*return*/, __spreadArray(__spreadArray([], currencies, true), jettons, true)];
                case 3:
                    error_3 = _a.sent();
                    console.error('Error fetching currencies for address:', address, error_3);
                    throw new Error('Failed to fetch currencies.');
                case 4: return [2 /*return*/];
            }
        });
    });
}
export function GET(req) {
    return __awaiter(this, void 0, void 0, function () {
        var searchParams, address, currencies, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    searchParams = new URL(req.url).searchParams;
                    address = searchParams.get('address');
                    if (!address) {
                        return [2 /*return*/, NextResponse.json({ error: 'Address is required' }, { status: 400 })];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetchCurrencies(address)];
                case 2:
                    currencies = _a.sent();
                    return [2 /*return*/, NextResponse.json({ currencies: currencies })];
                case 3:
                    error_4 = _a.sent();
                    return [2 /*return*/, NextResponse.json({ error: 'Failed to fetch currencies' }, { status: 500 })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
