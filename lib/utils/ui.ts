type TelegramWindow = Window &
	typeof globalThis & {
		Telegram?: {
			WebApp?: {
				HapticFeedback: {
					impactOccurred: (style: 'light' | 'medium' | 'heavy') => void
				}
			}
		}
	}

export function triggerHapticFeedback(
	telegramWebApp: TelegramWindow | Window = window,
	style: 'light' | 'medium' | 'heavy' = 'medium'
) {
	if (!telegramWebApp) return

	const vibrationEnabled = localStorage.getItem('vibrationEnabled') !== 'false'
	if (!vibrationEnabled) return

	const hapticFeedback = (telegramWebApp as TelegramWindow).Telegram?.WebApp
		?.HapticFeedback
	if (hapticFeedback?.impactOccurred) {
		hapticFeedback.impactOccurred(style)
	}
}
