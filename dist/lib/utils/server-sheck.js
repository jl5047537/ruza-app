import crypto from 'crypto';
export function validateTelegramWebAppData(telegramInitData) {
    var TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    var BYPASS_AUTH = process.env.BYPASS_TELEGRAM_AUTH === 'true';
    console.log("validateTelegram");
    console.log("telegramInitData", telegramInitData);
    var validatedData = null;
    var user = {};
    var message = '';
    if (BYPASS_AUTH) {
        validatedData = { temp: '' };
        user = { id: 'undefined', username: 'Unknown User' };
        message = 'Authentication bypassed for development';
    }
    else {
        if (!TELEGRAM_BOT_TOKEN) {
            return { message: 'TELEGRAM_BOT_TOKEN is not set', validatedData: null, user: {} };
        }
        var initData = new URLSearchParams(telegramInitData);
        var hash = initData.get('hash');
        if (!hash) {
            return { message: 'Hash is missing from initData', validatedData: null, user: {} };
        }
        initData.delete('hash');
        var authDate = initData.get('auth_date');
        if (!authDate) {
            return { message: 'auth_date is missing from initData', validatedData: null, user: {} };
        }
        var authTimestamp = parseInt(authDate, 10);
        var currentTimestamp = Math.floor(Date.now() / 1000);
        var timeDifference = currentTimestamp - authTimestamp;
        var threeHoursInSeconds = 3 * 60 * 60;
        if (timeDifference > threeHoursInSeconds) {
            return { message: 'Telegram data is older than 3 hours', validatedData: null, user: {} };
        }
        var dataCheckString = Array.from(initData.entries())
            .sort(function (_a, _b) {
            var a = _a[0];
            var b = _b[0];
            return a.localeCompare(b);
        })
            .map(function (_a) {
            var key = _a[0], value = _a[1];
            return "".concat(key, "=").concat(value);
        })
            .join('\n');
        console.log("Data Check String:", dataCheckString);
        var secretKey = crypto.createHmac('sha256', 'WebAppData').update(TELEGRAM_BOT_TOKEN).digest();
        var calculatedHash = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex');
        console.log("Calculated Hash:", calculatedHash);
        console.log("Received Hash:", hash);
        if (calculatedHash === hash) {
            validatedData = Object.fromEntries(initData.entries());
            message = 'Validation successful';
            var userString = validatedData['user'];
            if (userString) {
                try {
                    user = JSON.parse(userString);
                    console.log("Parsed user data:", user);
                }
                catch (error) {
                    console.error('Error parsing user data:', error);
                    message = 'Error parsing user data';
                    validatedData = null;
                }
            }
            else {
                message = 'User data is missing';
                validatedData = null;
            }
        }
        else {
            message = 'Hash validation failed';
            console.log(message);
        }
    }
    return { validatedData: validatedData, user: user, message: message };
}
