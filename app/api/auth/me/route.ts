import prisma from '@/lib/prisma'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	const { telegramId, username, referralId } = await req.json()

	try {
		const existingUser = await prisma.user.findUnique({
			where: { telegramId },
		})

		if (existingUser) {
			return NextResponse.json(
				{ error: 'User already exists' },
				{ status: 400 }
			)
		}

		const newUser = await prisma.user.create({
			data: {
				telegramId,
				username,
				referral: referralId || null,
			},
		})

		if (referralId) {
			await prisma.user.update({
				where: { id: referralId },
				data: {
					referrals: {
						connect: { id: newUser.id },
					},
				},
			})
		}

		const jwtToken = jwt.sign(
			{ id: newUser.id },
			process.env.JWT_SECRET as string,
			{
				expiresIn: '1h',
			}
		)

		return NextResponse.json({ token: jwtToken })
	} catch (error) {
		console.error('Registration failed:', error)
		return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
	}
}

export async function GET(req: NextRequest) {
	const authHeader = req.headers.get('authorization')
	console.log('Authorization Header:', authHeader)

	if (!authHeader) {
		return NextResponse.json(
			{ error: 'Authorization header is missing' },
			{ status: 401 }
		)
	}

	const token = authHeader.split(' ')[1]
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
			id: string
		}
		console.log('Decoded Token:', decoded)

		const user = await prisma.user.findUnique({
			where: { id: decoded.id },
		})

		if (!user) {
			console.error('User not found in database.')
			return NextResponse.json({ error: 'User not found' }, { status: 404 })
		}

		return NextResponse.json({ user })
	} catch (error) {
		console.error('Token verification error:', error)

		return NextResponse.json(
			{ error: 'Invalid or expired token' },
			{ status: 401 }
		)
	}
}
