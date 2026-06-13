import { create } from "zustand";
import { getFaqsApi } from "../services/faqs.api";

export const useFaqsStore = create((set) => ({
  faqs: [],
  loading: false,
  error: null,

  getFaqs: async () => {
    try {
      set({ loading: true, error: null });

      const res = await getFaqsApi();

      set({
        faqs: res.data?.data || res.data,
        loading: false,
      });

      return res.data;
    } catch (err) {
      set({
        loading: false,
        error:
          err?.response?.data?.message ||
          "Failed to fetch FAQs",
      });

      throw err;
    }
  },

  clearFaqs: () =>
    set({
      faqs: [],
    }),
}));