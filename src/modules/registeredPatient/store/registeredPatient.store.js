import { create } from "zustand";
import {
  getRegisteredPatientsApi,
  getRegisteredPatientDetailApi,
} from "../services/registeredPatient.api";

export const useRegisteredPatientStore = create((set) => ({
  patients: [],
  total: 0,
  page: 1,
  limit: 20,
  loading: false,
  error: null,
  patientDetail: null,
  detailLoading: true,

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

  getPatientDetail: async (leadId) => {
    try {
      set({ detailLoading: true, error: null });
      const res = await getRegisteredPatientDetailApi(leadId);
      set({
        patientDetail: res.data?.data || null,
        detailLoading: false,
      });
      return res.data;
    } catch (err) {
      set({
        detailLoading: false,
        error: err?.response?.data?.message || "Failed to fetch patient details",
      });
      throw err;
    }
  },

  clearPatients: () => set({ patients: [] }),
  clearPatientDetail: () => set({ patientDetail: null, detailLoading: true }),
}));