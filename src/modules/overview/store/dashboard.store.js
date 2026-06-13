import { create } from "zustand";
import { getDashboardApi } from "../services/dashboard.api";

export const useDashboardStore = create((set) => ({
  dashboard: null,
  loading: false,
  error: null,

  getDashboard: async (params) => {
    try {
      set({ loading: true, error: null });

      const res = await getDashboardApi(params);

      set({
        dashboard: res.data?.data || res.data,
        loading: false,
      });

      return res.data;
    } catch (err) {
      set({
        loading: false,
        error:
          err?.response?.data?.message ||
          "Failed to fetch dashboard",
      });

      throw err;
    }
  },

  clearDashboard: () =>
    set({
      dashboard: null,
    }),
}));