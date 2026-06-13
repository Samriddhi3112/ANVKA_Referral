import { create } from "zustand";
import { getConsultationsApi } from "../services/consultation.api";

export const useConsultationsStore = create((set) => ({
  consultations: [],
  total: 0,
  page: 1,
  limit: 20,
  loading: false,
  error: null,

  getConsultations: async (params) => {
    try {
      set({ loading: true, error: null });

      const res = await getConsultationsApi(params);

      set({
        consultations: res.data?.data?.consultations || [],
        total: res.data?.data?.total || 0,
        page: res.data?.data?.page || 1,
        limit: res.data?.data?.limit || 20,
        loading: false,
      });

      return res.data;
    } catch (err) {
      set({
        loading: false,
        error:
          err?.response?.data?.message ||
          "Failed to fetch consultations",
      });

      throw err;
    }
  },

  clearConsultations: () =>
    set({
      consultations: [],
      total: 0,
      page: 1,
    }),
}));