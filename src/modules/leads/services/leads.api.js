import { axiosInstance } from "../../../app/auth/services/apiClient";

// Get all leads
export const getLeadsApi = (params = {}) => {
  return axiosInstance.get("/referral/leads", { params });
};

// Get lead detail by id
export const getLeadDetailApi = (id) => {
  return axiosInstance.get(`/referral/leads/${id}`);
};

// Create a new lead
export const createLeadApi = (data) => {
  return axiosInstance.post("/referral/leads", data);
};