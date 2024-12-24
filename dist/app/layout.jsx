'use client';
import { Roboto } from 'next/font/google';
import './globals.scss';
var roboto = Roboto({
    weight: ['100', '300', '400', '500', '700', '900'],
    subsets: ['latin'],
});
export default function RootLayout(_a) {
    var children = _a.children;
    return (<html lang='ru'>
			<body className={"".concat(roboto.className, " antialiased")}>{children}</body>
		</html>);
}
