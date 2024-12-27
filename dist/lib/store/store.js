import { create } from 'zustand';
var useStore = create(function (set) { return ({
    tonWalletAddress: null,
    walletStatus: false,
    setTonWalletAddress: function (address) { return set({ tonWalletAddress: address }); },
    setWalletStatus: function (status) { return set({ walletStatus: status }); },
    resetWalletState: function () { return set({ tonWalletAddress: null, walletStatus: false }); },
    isAuthenticated: false,
    token: null,
    user: null,
    setAuthentication: function (isAuthenticated, token, user) {
        return set({ isAuthenticated: isAuthenticated, token: token, user: user });
    },
    resetAuthState: function () {
        return set({ isAuthenticated: false, token: null, user: null });
    },
}); });
export default useStore;
