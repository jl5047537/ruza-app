import prisma from '@/lib/prisma'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	const authHeader = req.headers.get('authorization')

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return NextResponse.json(
			{ error: 'Authorization header is missing or invalid.' },
			{ status: 401 }
		)
	}

	const token = authHeader.split(' ')[1]
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
			id: string
		}

		const { tonWalletAddress } = await req.json()

		if (typeof tonWalletAddress !== 'string' && tonWalletAddress !== null) {
			return NextResponse.json(
				{ error: 'Invalid wallet address format.' },
				{ status: 400 }
			)
		}

		await prisma.user.update({
			where: { id: decoded.id },
			data: { tonWalletAddress },
		})

		return NextResponse.json({
			message: 'Wallet address updated successfully.',
		})
	} catch (error) {
		console.error('Token verification error:', error)
		return NextResponse.json(
			{ error: 'Invalid or expired token.' },
			{ status: 401 }
		)
	}
}
