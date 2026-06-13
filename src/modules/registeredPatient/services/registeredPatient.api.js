import { axiosInstance } from "../../../app/auth/services/apiClient";

export const getRegisteredPatientsApi = (params) => {
  return axiosInstance.get("/referral/registered-patients", {
    params,
  });
};