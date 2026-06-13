import { create } from "zustand";
import {
  getWalletApi,
  getEarningsApi,
} from "../services/wallet.api";

export const useWalletStore = create((set) => ({
  wallet: null,
  earnings: [],
  loading: false,
  error: null,

  getWallet: async () => {
    try {
      set({ loading: true, error: null });

      const res = await getWalletApi();

      set({
        wallet: res.data?.data || res.data,
        loading: false,
      });

      return res.data;
    } catch (err) {
      set({
        loading: false,
        error:
          err?.response?.data?.message ||
          "Failed to fetch wallet",
      });

      throw err;
    }
  },

  getEarnings: async (type) => {
    try {
      set({ loading: true, error: null });

      const res = await getEarningsApi(type);

      set({
        earnings: res.data?.data || res.data,
        loading: false,
      });

      return res.data;
    } catch (err) {
      set({
        loading: false,
        error:
          err?.response?.data?.message ||
          "Failed to fetch earnings",
      });

      throw err;
    }
  },

  clearEarnings: () =>
    set({
      earnings: [],
    }),
}));