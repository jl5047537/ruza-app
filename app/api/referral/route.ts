import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const { userId } = await req.json()

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const referralLink = `${process.env.BASE_URL}/auth/?referralId=${user.id}`

    return NextResponse.json({ referralLink })
  } catch (error) {
    console.error('Error generating referral link:', error)
    return NextResponse.json({ error: 'Error generating referral link' }, { status: 500 })
  }
}