import { create } from "zustand";
import {
  getStaticContentApi,
} from "../services/staticContent.api";

export const useStaticContentStore = create((set) => ({
  content: null,
  loading: false,
  error: null,

  getStaticContent: async (type) => {
    try {
      set({ loading: true, error: null });

      const res = await getStaticContentApi(type);

      set({
        content: res.data?.data || res.data,
        loading: false,
      });

      return res.data;
    } catch (err) {
      set({
        loading: false,
        error:
          err?.response?.data?.message ||
          "Failed to fetch content",
      });

      throw err;
    }
  },

  clearContent: () =>
    set({
      content: null,
    }),
}));