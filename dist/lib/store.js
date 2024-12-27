import { create } from 'zustand';
export var useWalletStore = create(function (set) { return ({
    address: null,
    setAddress: function (address) { return set({ address: address }); },
}); });
