'use client'

import { Roboto } from 'next/font/google'
import './globals.scss'

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
			<body className={`${roboto.className} antialiased`}>{children}</body>
		</html>
	)
}
