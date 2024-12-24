'use client'

import { Roboto } from 'next/font/google'
import './globals.scss'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import { ToastProvider } from '@/lib/contexts/ToastContext'
import { WALLET_MANIFEST_URL } from '@/lib/utils/consts'

const roboto = Roboto({
	weight: ['100', '300', '400', '500', '700', '900'],
	subsets: ['latin'],
})

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru'>
			<body className={`${roboto.className} antialiased`}>
				<TonConnectUIProvider manifestUrl={WALLET_MANIFEST_URL}>
					<ToastProvider>{children}</ToastProvider>
				</TonConnectUIProvider>
			</body>
		</html>
	)
}
