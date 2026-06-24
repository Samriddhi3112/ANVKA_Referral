import { create } from "zustand";
import {
  createWithdrawalApi,
  getWithdrawalsApi,
} from "../services/withdrawals.api";

export const useWithdrawalsStore = create((set) => ({
  withdrawals: [],
  total: 0,
  page: 1,
  limit: 20,
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

  getWithdrawals: async (page = 1) => {
    try {
      set({ loading: true, error: null });

      const res = await getWithdrawalsApi(page);

      set({
        withdrawals: res?.data?.data?.withdrawals || [],
        total: res?.data?.data?.total || 0,
        page: res?.data?.data?.page || 1,
        limit: res?.data?.data?.limit || 20,
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