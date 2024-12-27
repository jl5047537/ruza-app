import prisma from '@/lib/prisma'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
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

		const user = await prisma.user.findUnique({
			where: { id: decoded.id },
			select: { tonWalletAddress: true, walletStatus: true },
		})

		if (!user) {
			return NextResponse.json({ error: 'User not found.' }, { status: 404 })
		}

		return NextResponse.json({
			tonWalletAddress: user.tonWalletAddress,
			walletStatus: user.walletStatus,
		})
	} catch (error) {
		console.error('Token verification error:', error)
		return NextResponse.json(
			{ error: 'Invalid or expired token.' },
			{ status: 401 }
		)
	}
}

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
			data: {
				tonWalletAddress,
				walletStatus: true,
			},
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

export async function DELETE(req: NextRequest) {
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

		await prisma.user.update({
			where: { id: decoded.id },
			data: {
				tonWalletAddress: null,
				walletStatus: false,
			},
		})

		return NextResponse.json({
			message: 'Wallet disconnected successfully.',
		})
	} catch (error) {
		console.error('Token verification error:', error)
		return NextResponse.json(
			{ error: 'Invalid or expired token.' },
			{ status: 401 }
		)
	}
}
