import { create } from "zustand";
import {
  getBankDetailsApi,
  saveBankDetailsApi,
} from "../services/bankDetails.api";

export const useBankDetailsStore = create((set) => ({
  bankDetails: null,
  loading: false,
  saving: false,
  error: null,

  // GET
  getBankDetails: async () => {
    try {
      set({ loading: true, error: null });

      const res = await getBankDetailsApi();

      const data = res.data?.data || res.data;

      set({
        bankDetails: data,
        loading: false,
      });

      return data;
    } catch (err) {
      set({
        loading: false,
        error:
          err?.response?.data?.message ||
          "Failed to fetch bank details",
      });

      throw err;
    }
  },

  // ADD / UPDATE
  saveBankDetails: async (payload) => {
    try {
      set({ saving: true, error: null });

      const res = await saveBankDetailsApi(payload);

      const data = res.data?.data || res.data;

      set({
        bankDetails: data,
        saving: false,
      });

      return data;
    } catch (err) {
      set({
        saving: false,
        error:
          err?.response?.data?.message ||
          "Failed to save bank details",
      });

      throw err;
    }
  },

  // CLEAR
  clearBankDetails: () =>
    set({
      bankDetails: null,
    }),
}));