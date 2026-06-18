import { create } from "zustand";
import {
  getWalletApi,
  getEarningsApi,
  getTransactionsApi,
} from "../services/wallet.api";

export const useWalletStore = create((set) => ({
  wallet: null,
  earnings: [],
  transactions: [],
  transactionsMeta: { total: 0, page: 1, limit: 20 },
  earningsMeta: { total: 0, page: 1, limit: 20 },
  loading: false,
  error: null,

  getWallet: async () => {
    try {
      set({ loading: true, error: null });
      const res = await getWalletApi();
      set({ wallet: res.data?.data || res.data, loading: false });
      return res.data;
    } catch (err) {
      set({
        loading: false,
        error: err?.response?.data?.message || "Failed to fetch wallet",
      });
      throw err;
    }
  },

  // earningTab = "payment_history" | "my_earning"
  // filterType = "" | "commission" | "withdrawal" | "reversal"
  getEarnings: async (earningTab, page = 1, filterType = "") => {
    try {
      set({ loading: true, error: null });
      const res = await getEarningsApi(earningTab, page, filterType);
      const data = res.data?.data || res.data;
      set({
        earnings: data?.earnings || [],
        earningsMeta: {
          total: data?.total || 0,
          page: data?.page || 1,
          limit: data?.limit || 20,
        },
        loading: false,
      });
      return res.data;
    } catch (err) {
      set({
        loading: false,
        error: err?.response?.data?.message || "Failed to fetch earnings",
      });
      throw err;
    }
  },

    getTransactions: async (page = 1, filterType = "") => {
    try {
      set({ loading: true, error: null });
      const res = await getTransactionsApi(page, filterType);
      const data = res.data?.data || res.data;
      set({
        transactions: data?.transactions || [],
        transactionsMeta: {
          total: data?.total || 0,
          page: data?.page || 1,
          limit: data?.limit || 20,
        },
        loading: false,
      });
      return res.data;
    } catch (err) {
      set({ loading: false, error: err?.response?.data?.message || "Failed to fetch transactions" });
      throw err;
    }
  },

  clearTransactions: () =>
    set({
      transactions: [],
      transactionsMeta: {
        total: 0,
        page: 1,
        limit: 20,
      },
    }),

  clearEarnings: () =>
    set({
      earnings: [],
      earningsMeta: { total: 0, page: 1, limit: 20 },
    }),
}));
