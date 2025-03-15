export const fetchUserWalletAddress = async (token: string) => {
	const response = await fetch('/api/auth/me', {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})

	if (response.ok) {
		const data = await response.json()
		return data.user?.tonWalletAddress || null
	}

	console.error('Failed to fetch wallet address:', response.status)
	return null
}
