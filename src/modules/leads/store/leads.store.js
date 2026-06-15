import { create } from "zustand";
import {
  getLeadsApi,
  getLeadDetailApi,
  createLeadApi,
} from "../services/leads.api";

export const useLeadsStore = create((set) => ({
  leads: [],
  leadsMeta: { total: 0, page: 1, limit: 20 },
  leadDetail: null,
  loading: false,
  error: null,

  // Get all leads
  getLeads: async (params = {}) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const res = await getLeadsApi(params);
      const data = res.data?.data || res.data;

      set({
        leads: data?.leads || [],
        leadsMeta: {
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
          "Failed to fetch leads",
      });

      throw err;
    }
  },

  // Get lead detail by id
  getLeadDetail: async (id) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const res = await getLeadDetailApi(id);

      set({
        leadDetail: res.data?.data || res.data,
        loading: false,
      });

      return res.data;
    } catch (err) {
      set({
        loading: false,
        error:
          err?.response?.data?.message ||
          "Failed to fetch lead details",
      });

      throw err;
    }
  },

  // Create a new lead
  createLead: async (payload) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const res = await createLeadApi(payload);

      set({ loading: false });

      return res.data;
    } catch (err) {
      set({
        loading: false,
        error:
          err?.response?.data?.message ||
          "Failed to create lead",
      });

      throw err;
    }
  },

  clearLeadDetail: () =>
    set({
      leadDetail: null,
    }),
}));