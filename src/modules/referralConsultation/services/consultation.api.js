import { axiosInstance } from "../../../app/auth/services/apiClient";

export const getConsultationsApi = (params) => {
  return axiosInstance.get("/referral/consultations", {
    params,
  });
};