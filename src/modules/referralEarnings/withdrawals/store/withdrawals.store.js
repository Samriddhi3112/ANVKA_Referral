import { create } from "zustand";
import {
  createWithdrawalApi,
  getWithdrawalsApi,
} from "../services/withdrawals.api";

export const useWithdrawalsStore = create((set) => ({
  withdrawals: [],
  loading: false,
  error: null,

  createWithdrawal: async (payload) => {
    try {
      set({ loading: true, error: null });

      const res = await createWithdrawalApi(payload);

      set({
        loading: false,
      });

      return res.data;
    } catch (err) {
      set({
        loading: false,
        error:
          err?.response?.data?.message ||
          "Failed to submit withdrawal request",
      });

      throw err;
    }
  },

  getWithdrawals: async () => {
    try {
      set({ loading: true, error: null });

      const res = await getWithdrawalsApi();

      set({
        withdrawals: res.data?.data || res.data,
        loading: false,
      });

      return res.data;
    } catch (err) {
      set({
        loading: false,
        error:
          err?.response?.data?.message ||
          "Failed to fetch withdrawals",
      });

      throw err;
    }
  },

  clearWithdrawals: () =>
    set({
      withdrawals: [],
    }),
}));