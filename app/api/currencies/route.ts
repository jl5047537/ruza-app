import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)
	const address = searchParams.get('address')

	if (!address) {
		return NextResponse.json({ error: 'Address is required' }, { status: 400 })
	}

	try {
		const currencies = [
			{ name: 'TON', balance: '0' },
			{ name: 'USDT', balance: '0' },
			{ name: 'RuZa', balance: '100000' },
		]

		return NextResponse.json({ currencies })
	} catch (error) {
		console.error('Error fetching currencies:', error)
		return NextResponse.json(
			{ error: 'Failed to fetch currencies' },
			{ status: 500 }
		)
	}
}
