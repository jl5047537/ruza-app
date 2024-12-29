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
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import TelegramBot from 'node-telegram-bot-api';
var prisma = new PrismaClient();
dotenv.config();
var token = process.env.TELEGRAM_BOT_TOKEN;
var jwtSecret = process.env.JWT_SECRET;
if (!token) {
    throw new Error('TELEGRAM_BOT_TOKEN not found in environment variables');
}
if (!jwtSecret) {
    throw new Error('JWT_SECRET not found in environment variables');
}
var bot = new TelegramBot(token, { polling: true });
bot.onText(/\/start(\?referral=(\d+))?/, function (msg, match) { return __awaiter(void 0, void 0, void 0, function () {
    var chatId, referralId, existingUser, jwtToken;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                chatId = msg.chat.id;
                referralId = (match === null || match === void 0 ? void 0 : match[2]) ? match[2] : null;
                return [4 /*yield*/, prisma.user.findUnique({
                        where: { telegramId: chatId.toString() },
                    })];
            case 1:
                existingUser = _a.sent();
                if (existingUser) {
                    jwtToken = jwt.sign({ id: existingUser.id }, jwtSecret, {
                        expiresIn: '1h',
                    });
                    bot.sendMessage(chatId, "\u0412\u044B \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u043E\u0432\u0430\u043D\u044B. \u041F\u0435\u0440\u0435\u0439\u0434\u0438\u0442\u0435 \u043F\u043E \u0441\u0441\u044B\u043B\u043A\u0435: ".concat(process.env.BASE_URL, "/auth?token=").concat(jwtToken));
                }
                else {
                    bot.sendMessage(chatId, 'Привет! Для регистрации введите команду /auth');
                }
                return [2 /*return*/];
        }
    });
}); });
bot.onText(/\/auth/, function (msg) { return __awaiter(void 0, void 0, void 0, function () {
    var chatId, firstName, userLink, photos, avatarUrl, fileId, file, referralId, existingUser, newUser, jwtToken, redirectUrl, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                chatId = msg.chat.id;
                firstName = msg.chat.first_name;
                userLink = msg.chat.username;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 9, , 10]);
                return [4 /*yield*/, bot.getUserProfilePhotos(chatId)];
            case 2:
                photos = _b.sent();
                avatarUrl = '';
                if (!(photos.total_count > 0)) return [3 /*break*/, 4];
                fileId = photos.photos[0][0].file_id;
                return [4 /*yield*/, bot.getFile(fileId)];
            case 3:
                file = _b.sent();
                avatarUrl = "https://api.telegram.org/file/bot".concat(token, "/").concat(file.file_path);
                _b.label = 4;
            case 4:
                referralId = (_a = msg.text) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
                return [4 /*yield*/, prisma.user.findUnique({
                        where: { telegramId: chatId.toString() },
                    })];
            case 5:
                existingUser = _b.sent();
                if (existingUser) {
                    bot.sendMessage(chatId, 'Вы уже зарегистрированы.');
                    return [2 /*return*/];
                }
                return [4 /*yield*/, prisma.user.create({
                        data: {
                            telegramId: chatId.toString(),
                            username: firstName,
                            avatar: avatarUrl,
                            user_link: userLink,
                            referral: referralId || undefined,
                        },
                    })];
            case 6:
                newUser = _b.sent();
                jwtToken = jwt.sign({ id: newUser.id }, jwtSecret, {
                    expiresIn: '1h',
                });
                redirectUrl = "".concat(process.env.BASE_URL, "/auth?token=").concat(jwtToken);
                bot.sendMessage(chatId, "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F \u0443\u0441\u043F\u0435\u0448\u043D\u0430! \u041F\u0435\u0440\u0435\u0445\u043E\u0434\u0438\u0442\u0435 \u043F\u043E \u0441\u0441\u044B\u043B\u043A\u0435 \u0434\u043B\u044F \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0438\u044F: ".concat(redirectUrl));
                if (!referralId) return [3 /*break*/, 8];
                return [4 /*yield*/, prisma.user.update({
                        where: { id: referralId },
                        data: {
                            referrals: {
                                connect: {
                                    id: newUser.id,
                                },
                            },
                        },
                    })];
            case 7:
                _b.sent();
                _b.label = 8;
            case 8: return [3 /*break*/, 10];
            case 9:
                error_1 = _b.sent();
                console.error('Ошибка при сохранении пользователя:', error_1);
                bot.sendMessage(chatId, 'Произошла ошибка при регистрации. Попробуйте снова.');
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); });
console.log('Бот запущен. Ожидаем сообщения...');
