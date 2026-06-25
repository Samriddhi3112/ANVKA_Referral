import { create } from "zustand";
import {
  getCompletedPatientsApi,
  getCompletedPatientDetailApi,
} from "../services/profileCompletion.api";

export const useProfileCompletionStore = create((set) => ({
  patients: [],
  patientsMeta: { total: 0, page: 1, limit: 20 },
  patientDetail: null,
  loading: false,
  error: null,

  // Get all profile-completed patients
  getCompletedPatients: async (params = {}) => {
    try {
      set({ loading: true, error: null });

      const res = await getCompletedPatientsApi(params);
      const data = res.data?.data || res.data;

      set({
        patients: data?.patients || [],
        patientsMeta: {
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
        error:
          err?.response?.data?.message ||
          "Failed to fetch patients",
      });

      throw err;
    }
  },

  // Get profile-completion detail by leadId
  getCompletedPatientDetail: async (leadId) => {
    try {
      set({ loading: true, error: null });

      const res = await getCompletedPatientDetailApi(leadId);

      set({
        patientDetail: res.data?.data || res.data,
        loading: false,
      });

      return res.data;
    } catch (err) {
      set({
        loading: false,
        error:
          err?.response?.data?.message ||
          "Failed to fetch patient details",
      });

      throw err;
    }
  },

  clearPatientDetail: () => set({ patientDetail: null }),
}));