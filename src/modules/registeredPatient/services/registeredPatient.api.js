import { axiosInstance } from "../../../app/auth/services/apiClient";

export const getRegisteredPatientsApi = (params) => {
  return axiosInstance.get("/referral/registered-patients", { params });
};

export const getRegisteredPatientDetailApi = (leadId) => {
  return axiosInstance.get(`/referral/registered-patients/${leadId}`);
};