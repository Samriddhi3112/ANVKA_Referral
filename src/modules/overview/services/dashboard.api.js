import { axiosInstance } from "../../../app/auth/services/apiClient";

export const getDashboardApi = (params) => {
  return axiosInstance.get("/referral/dashboard", {
    params,
  });
};