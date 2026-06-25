import { axiosInstance } from "../../../app/auth/services/apiClient";

// Get all profile-completed patients
export const getCompletedPatientsApi = (params = {}) => {
  return axiosInstance.get("/referral/profile-completion-patients", { params });
};

// Get profile-completion detail by leadId
export const getCompletedPatientDetailApi = (leadId) => {
  return axiosInstance.get(`/referral/profile-completion-patients/${leadId}`);
};