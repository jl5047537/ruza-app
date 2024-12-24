import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	const prisma = new PrismaClient()
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
