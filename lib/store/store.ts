import { create } from 'zustand'

interface WalletState {
	tonWalletAddress: string | null
	walletStatus: boolean
	setTonWalletAddress: (address: string | null) => void
	setWalletStatus: (status: boolean) => void
	resetWalletState: () => void
}

interface AuthState {
	isAuthenticated: boolean
	token: string | null
	user: { id: string; username: string } | null
	setAuthentication: (
		isAuthenticated: boolean,
		token: string | null,
		user: { id: string; username: string } | null
	) => void
	resetAuthState: () => void
}

const useStore = create<WalletState & AuthState>(set => ({
	tonWalletAddress: null,
	walletStatus: false,
	setTonWalletAddress: address => set({ tonWalletAddress: address }),
	setWalletStatus: status => set({ walletStatus: status }),
	resetWalletState: () => set({ tonWalletAddress: null, walletStatus: false }),

	isAuthenticated: false,
	token: null,
	user: null,
	setAuthentication: (isAuthenticated, token, user) =>
		set({ isAuthenticated, token, user }),
	resetAuthState: () =>
		set({ isAuthenticated: false, token: null, user: null }),
}))

export default useStore
