export function triggerHapticFeedback(telegramWebApp, style) {
    var _a, _b;
    if (telegramWebApp === void 0) { telegramWebApp = window; }
    if (style === void 0) { style = 'medium'; }
    if (!telegramWebApp)
        return;
    var vibrationEnabled = localStorage.getItem('vibrationEnabled') !== 'false';
    if (!vibrationEnabled)
        return;
    var hapticFeedback = (_b = (_a = telegramWebApp.Telegram) === null || _a === void 0 ? void 0 : _a.WebApp) === null || _b === void 0 ? void 0 : _b.HapticFeedback;
    if (hapticFeedback === null || hapticFeedback === void 0 ? void 0 : hapticFeedback.impactOccurred) {
        hapticFeedback.impactOccurred(style);
    }
}
