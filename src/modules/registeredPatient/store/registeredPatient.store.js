import { create } from "zustand";
import { getRegisteredPatientsApi } from "../services/registeredPatient.api";

export const useRegisteredPatientStore = create((set) => ({
  patients: [],
  total: 0,
  page: 1,
  limit: 20,
  loading: false,
  error: null,

  getRegisteredPatients: async (params) => {
    try {
      set({ loading: true, error: null });

      const res = await getRegisteredPatientsApi(params);

      set({
        patients: res.data?.data?.patients || [],
        total: res.data?.data?.total || 0,
        page: res.data?.data?.page || 1,
        limit: res.data?.data?.limit || 20,
        loading: false,
      });

      return res.data;
    } catch (err) {
      set({
        loading: false,
        error: err?.response?.data?.message || "Failed to fetch patients",
      });

      throw err;
    }
  },

  clearPatients: () =>
    set({
      patients: [],
    }),
}));
