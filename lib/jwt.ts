import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET as string

export function createJwtToken(userId: string) {
	const payload = {
		sub: userId,
		iat: Math.floor(Date.now() / 1000),
	}

	return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' })
}

export function verifyJwtToken(token: string) {
	try {
		const decoded = jwt.verify(token, JWT_SECRET)
		return decoded
	} catch (error) {
		return null
	}
}
