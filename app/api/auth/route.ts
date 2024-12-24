import prisma from '@/lib/prisma'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)
	const token = searchParams.get('token')

	if (!token) {
		return NextResponse.json({ error: 'Token is missing' }, { status: 400 })
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
			telegramId: number
			username: string
		}

		let user = await prisma.user.findUnique({
			where: { telegramId: decoded.telegramId.toString() },
		})

		if (!user) {
			user = await prisma.user.create({
				data: {
					telegramId: decoded.telegramId.toString(),
					username: decoded.username,
				},
			})
		}

		const accessToken = jwt.sign(
			{ id: user.id, username: user.username },
			process.env.JWT_SECRET as string,
			{ expiresIn: '2h' }
		)

		return NextResponse.redirect(
			`${process.env.BASE_URL}/?token=${accessToken}`
		)
	} catch (error) {
		return NextResponse.json(
			{ error: 'Invalid or expired token' },
			{ status: 401 }
		)
	}
}
